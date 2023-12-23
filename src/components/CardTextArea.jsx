/* eslint-disable react/prop-types */
import { Box, Flex, Avatar, Textarea, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import { useSelector } from "react-redux";
import { baseUrl } from "../utils/config";
import { useState } from "react";

const CardTextArea = ({ getTweets }) => {
  // ambil id user yang sudah login melalui global state
  const user = useSelector((state) => state.user);
  const [tweet, setTweet] = useState("");
  const isTweetEmpty = tweet.trim() === "";

  console.log(tweet);
  const handleTweet = async () => {
    try {
      await axios.post(baseUrl + "/tweets", {
        tweet: tweet,
        userId: user.id,
        createdAt: new Date(),
      });
      setTweet("");
    } catch (error) {
      console.log(error);
    } finally {
      getTweets();
    }
  };
  return (
    <Box mt="4" p="4" shadow={"sm"}>
      <Flex gap="6" alignItems="center">
        <Avatar bg="teal.500" size="xl" />
        <Textarea
          onChange={(e) => setTweet(e.target.value)}
          maxLength={150}
          value={tweet}
        />
      </Flex>
      <Text textAlign="end">{tweet.length}/150</Text>
      <Flex justifyContent="end">
        <Button onClick={handleTweet} isDisabled={isTweetEmpty}>
          Posting
        </Button>
      </Flex>
    </Box>
  );
};

export default CardTextArea;
