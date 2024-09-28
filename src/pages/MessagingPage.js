import React, { useState, useRef, useEffect, memo } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import {
  colors,
  typography,
  componentMargin,
  componentWidth,
} from "../shared_styles/master_styles";
import SendIcon from "../shared_components/icons/SendIcon";
import PlusIcon from "../shared_components/icons/PlusIcon";
import SentIcon from "../shared_components/icons/SentIcon";
import DeliveredIcon from "../shared_components/icons/DeliveredIcon";
import ReadIcon from "../shared_components/icons/ReadIcon";
import WarningIcon from "../shared_components/icons/WarningIcon";
import {
  ReadEventMessagesLink,
  WriteEventMessagesLink,
} from "../shared_components/api_routes";
import { useFocusEffect } from "@react-navigation/native";
import { sns } from "../../aws-config";

const USER = "Aditya";
const MESSAGE_SEPARATOR_HEIGHT = 2;
const MESSAGE_PADDING = 10;
const MESSAGE_LINE_HEIGHT = 20;
const MESSAGE_STATUSES = {
  SENT: "sent",
  DELIVERED: "delivered",
  READ: "read",
};
const SNS_TOPIC = "arn:aws:sns:us-east-2:975050380786:1";

const publishMessageToSNSTopic = async (messageObject) => {
  const params = {
    Message: JSON.stringify(messageObject),
    TopicArn: SNS_TOPIC,
  };

  try {
    await sns.publish(params).promise();
    console.log("Message published to SNS topic");
  } catch (error) {
    console.error("Error publishing message to SNS topic:", error);
  }
};

// further optimization ideas: caching messages on phone, memoization of entire flatlist, useCallback for the height calculations, limit viewable items on flatlist
export default function MessagingPage() {
  const [newMessage, setNewMessage] = useState("");
  const [messageData, setMessageData] = useState([]);
  const [heightArray, setHeightArray] = useState([]);
  const flatlistref = useRef();

  const numMessages = 25;

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(ReadEventMessagesLink, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              TableName: "EventMessages",
              EventID: "1",
              NumberOfMessages: `${numMessages}`,
            }),
          });
          const data = await response.json();
          const items = await data.Items;
          console.log(data);
          //reformat the data to match the format of the messageData
          const reformattedData = items.map((item) => {
            return {
              sender: item.SenderID,
              content: item.MessageContent,
              time: item.Timestamp,
              key: item.MessageID,
            };
          });
          updateHeightArray_multipleMessages(reformattedData);
          setMessageData(reformattedData);
        } catch (error) {
          console.error("Failed to fetch event messages:", error);
        }
      };

      fetchData();
    }, [])
  );

  const getMessageModifiers = (
    currentMessage,
    previousMessage,
    nextMessage,
    isFirstMessage,
    isLastMessage
  ) => {
    let profilePictureShown = false;
    if (isLastMessage) {
      if (currentMessage.sender != USER) {
        profilePictureShown = true;
      }
    } else {
      if (currentMessage.sender != nextMessage.sender) {
        profilePictureShown = true;
      }
    }

    let senderShown = false;
    if (isFirstMessage) {
      if (currentMessage.sender != USER) {
        senderShown = true;
      }
    } else {
      if (currentMessage.sender != previousMessage.sender) {
        senderShown = true;
      }
    }

    const timeShown =
      isFirstMessage || currentMessage.time != previousMessage.time;
    return { profilePictureShown, senderShown, timeShown };
  };
  const estimateMessageHeight = (
    currentMessage,
    previousMessage,
    nextMessage,
    isFirstMessage,
    isLastMessage
  ) => {
    // need to fix this to account for special rendering (e.g., senderShown, profilePictureShown, timeShown, statusShown)
    // need to precisely adapt to height of data (using widths of individual characters)
    // refactor code so that we get the correct message modifiers even if it's on the left side
    const numberOfLines = Math.ceil(currentMessage.content.length / 30);
    const STANDARD_HEIGHT =
      numberOfLines * MESSAGE_LINE_HEIGHT +
      MESSAGE_PADDING * 2 +
      MESSAGE_SEPARATOR_HEIGHT;

    let additionalHeight = 0;
    const { senderShown, timeShown } = getMessageModifiers(
      currentMessage,
      previousMessage,
      nextMessage,
      isFirstMessage,
      isLastMessage
    );
    if (senderShown) additionalHeight += 26.6;
    if (timeShown) additionalHeight += 27;

    const MESSAGE_HEIGHT = STANDARD_HEIGHT + additionalHeight;
    return MESSAGE_HEIGHT;
  };
  const updateHeightArray = (currentMessage) => {
    // needs to be fixed!!
    const length = estimateMessageHeight(
      currentMessage,
      messageData[messageData.length - 1],
      null,
      false,
      true
    );
    console.log("length", length);
    const offset = heightArray[heightArray.length - 1].offset + length;
    setHeightArray((prevState) => [
      ...prevState,
      { length, offset, index: heightArray.length - 1 },
    ]);
  };
  const updateHeightArray_multipleMessages = (messageDataDiffs) => {
    let offset = -1;
    const heightArrayIsEmpty = JSON.stringify(heightArray) == "[]"; // TODO FIX THIS LOL
    if (heightArrayIsEmpty) {
      offset = 0;
    } else {
      offset = heightArray[heightArray.length - 1].offset;
    }
    const heightArrayDiffs = messageDataDiffs.map((currentMessage, index) => {
      let previousMessage = null;
      let nextMessage = null;
      const isFirstMessage = index == 0 && heightArrayIsEmpty;
      const isLastMessage = index == messageDataDiffs.length - 1;
      if (index == 0 && !heightArrayIsEmpty) {
        previousMessage = messageData[messageData.length - 1];
      } else if (index > 0) {
        previousMessage = messageDataDiffs[index - 1];
      }
      if (index < messageDataDiffs.length - 1) {
        nextMessage = messageDataDiffs[index + 1];
      }
      const length = estimateMessageHeight(
        currentMessage,
        previousMessage,
        nextMessage,
        isFirstMessage,
        isLastMessage
      );
      offset += length;
      return { length, offset, index: heightArray.length + index };
    });
    setHeightArray((prevState) => [...prevState, ...heightArrayDiffs]);
  };

  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: "black", flex: 1 }}
      behavior={"padding"}
      keyboardVerticalOffset={90}
    >
      {messageData != [] && heightArray != [] && (
        <FlatList
          data={messageData}
          renderItem={({ item, index }) => {
            let previousMessage = null;
            let nextMessage = null;
            const isFirstMessage = index == 0;
            const isLastMessage = index == messageData.length - 1;
            if (!isFirstMessage) {
              previousMessage = messageData[index - 1];
            }
            if (!isLastMessage) {
              nextMessage = messageData[index + 1];
            }
            const { profilePictureShown, senderShown, timeShown } =
              getMessageModifiers(
                item,
                previousMessage,
                nextMessage,
                isFirstMessage,
                isLastMessage
              );
            return (
              <Message
                sender={item.sender}
                content={item.content}
                time={item.time}
                profilePictureShown={profilePictureShown}
                senderShown={senderShown}
                timeShown={timeShown}
                key={item.key}
              />
            );
          }} // you need to extract all the fields for memo optimization (<Message/> is a memo)
          keyExtractor={({ item }) => JSON.stringify(item)}
          contentContainerStyle={{ flexGrow: 1 }}
          ref={flatlistref}
          onLayout={() =>
            flatlistref.current.scrollToEnd({
              animated: true,
            })
          }
          onContentSizeChange={() => {
            if (flatlistref.current) {
              flatlistref.current.scrollToEnd({ animated: true });
            }
          }}
          ListHeaderComponent={() => {
            return (
              <View
                style={{
                  height: 10,
                }}
              ></View>
            );
          }}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  minHeight: 20,
                  alignItems: "flex-end",
                }}
              >
                {/* <MessageStatus stat={MESSAGE_STATUSES.DELIVERED} /> */}
              </View>
            );
          }}
          disableVirtualization // much less laggy with disableVirtualization == true
          ItemSeparatorComponent={() => <View style={{ height: 2 }} />}
          getItemLayout={(data, index) => {
            const { length, offset } = heightArray[index];
            return { length, offset, index };
          }}
          indicatorStyle={{ color: "white" }}
        />
      )}
      <View
        style={{
          marginBottom: 10,
          marginTop: 10,
          flexDirection: "row",
          flex: 1,
          minHeight: 35,
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <PlusIcon />
        <View
          style={{
            flexDirection: "row",
            borderColor: colors.gray3,
            borderWidth: 0.5,
            borderRadius: 20,
            padding: 5,
            paddingLeft: 15,
            minHeight: 36,
            marginLeft: 5,
            flex: 1,
          }}
        >
          <TextInput
            placeholder="Type"
            value={newMessage}
            onChangeText={(newText) => setNewMessage(newText)}
            style={{
              flex: 1,
              fontSize: 16,
              color: "white",
            }}
            placeholderTextColor={colors.gray3}
          />
          {newMessage != "" && (
            <TouchableOpacity
              onPress={() => {
                const oldMessageObject = {
                  sender: "Aditya",
                  content: newMessage,
                  time: new Date()
                    .toISOString()
                    .replace("T", " ")
                    .replace("Z", ""),
                };
                const newMessageObject = {
                  TableName: "EventMessages",
                  EventID: "1",
                  Timestamp: new Date()
                    .toISOString()
                    .replace("T", " ")
                    .replace("Z", ""),
                  MessageID: messageData.length + 1,
                  SenderID: "Aditya",
                  MessageContent: newMessage,
                  AdditionalMetadata: {
                    ReadStatus: false,
                    Attachments: [],
                  },
                };

                fetch(WriteEventMessagesLink, {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                  method: "POST",
                  body: JSON.stringify(newMessageObject),
                });

                publishMessageToSNSTopic(newMessageObject);
                setMessageData((prevState) => [...prevState, oldMessageObject]);
                updateHeightArray(oldMessageObject);
                setNewMessage("");
              }}
            >
              <SendIcon />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

// you need to extract all the fields for memo optimization (message is a memo)
const Message = memo(function Message({
  sender,
  content,
  time,
  profilePictureShown,
  senderShown,
  timeShown,
  statusShown,
}) {
  const getMessage = () => {
    if (sender === USER) {
      return (
        <MessageRight
          sender={sender}
          content={content}
          time={time}
          statusShown={statusShown}
        />
      );
    } else {
      return (
        <MessageLeft
          sender={sender}
          content={content}
          time={time}
          profilePictureShown={profilePictureShown}
          senderShown={senderShown}
        />
      );
    }
  };
  return (
    <View
      style={{ width: "100%", alignItems: "center", paddingHorizontal: 10 }}
    >
      {timeShown && (
        <Text style={[typography.defaultGrey, { marginVertical: 5 }]}>
          {time}
        </Text>
      )}
      {getMessage()}
    </View>
  );
});

const MessageLeft = ({
  sender,
  content,
  time,
  profilePictureShown,
  senderShown,
}) => {
  // fetch profile picture
  return (
    <View
      style={{
        alignItems: "flex-end",
        flexDirection: "row",
      }}
    >
      {(profilePictureShown && (
        <Image
          source={require("../../assets/joanna.png")}
          style={{
            height: 30,
            width: 30,
            borderRadius: 20,
            marginRight: 5,
            bottom: 0,
          }}
        />
      )) || <View style={{ width: 35 }} />}
      <View style={{ flex: 1, alignItems: "flex-start" }}>
        {senderShown && (
          <Text
            style={[typography.smallGrey, { marginBottom: 2, marginTop: 10 }]}
          >
            {sender}
          </Text>
        )}
        <View
          style={{
            backgroundColor: colors.gray3,
            padding: MESSAGE_PADDING,
            borderRadius: 20,
            maxWidth: 300,
          }}
        >
          <Text style={typography.large}>{content}</Text>
        </View>
      </View>
    </View>
  );
};

const MessageRight = ({ sender, content, time, statusShown }) => {
  return (
    <View
      style={{
        alignItems: "flex-end",
        width: "100%",
      }}
    >
      <View
        style={{
          backgroundColor: colors.appleBlue,
          padding: MESSAGE_PADDING,
          borderRadius: 20,
          maxWidth: 300,
        }}
      >
        <Text style={typography.large}>{content}</Text>
      </View>
      {statusShown && <MessageStatus stat={MESSAGE_STATUSES.DELIVERED} />}
    </View>
  );
};

const MessageStatus = ({ stat }) => {
  switch (stat) {
    case MESSAGE_STATUSES.SENT:
      return <SentIcon />;
    case MESSAGE_STATUSES.DELIVERED:
      return <DeliveredIcon />;
    case MESSAGE_STATUSES.READ:
      return <ReadIcon />;
    default:
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <WarningIcon />
          <Text style={[typography.smallBold, { color: colors.red }]}>
            Error
          </Text>
        </View>
      );
  }
};
