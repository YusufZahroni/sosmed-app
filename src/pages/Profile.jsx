import Layout from "../components/Layout";
import {
  Box,
  Image,
  Avatar,
  Flex,
  Textarea,
  Button,
  Text,
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import axios from "axios";
import { baseUrl } from "../utils/config";
import { useEffect } from "react";
import { useState } from "react";
import CardTweet from "../components/CardTweet";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState("");
  const getTweets = async () => {
    try {
      const response = await axios.get(
        baseUrl + `/tweets?userId=${user.id}&_expand=user&_sort=id&_order=desc`
      );
      setTweets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTweets = async () => {
    try {
      await axios.post(baseUrl + `/tweets`, {
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
  useEffect(() => {
    getTweets();
  }, []);

  const getInitials = (name) => {
    const names = name.split(" ");
    return names.map((n) => n[0]).join("");
  };

  return (
    <Layout>
      <Box w="full">
        <Image
          w="full"
          h="200px"
          mx={"2"}
          pr={"2"}
          objectFit="cover"
          src="https://images.unsplash.com/photo-1590523814912-8fa42161c47a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YXBwbGUlMjB3YWxscGFwZXJzfGVufDB8fDB8fHwwhttps://images.unsplash.com/photo-1504805572947-34fad45aed93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29kaW5nJTIwYmFja2dyb3VuZHxlbnwwfHwwfHx8MA%3D%3Dhttps://unsplash.com/photos/do-something-great-neon-sign-oqStl2L5oxIhttps://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3Dhttps://images.unsplash.com/photo-1568581357391-c71a1675ef93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGRvbGxhcnxlbnwwfHwwfHx8MA%3D%3Dhttps://images.unsplash.com/photo-1516414559093-91c1c3d7359c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Box px="4" pr="0">
          <Avatar name={getInitials(user.username)} size="lg" my="-10" />
          <Flex justifyContent="space-between">
            <Flex flexDir="column">
              <Text fontWeight="bold" fontSize="xx-large">
                @{user.username}
              </Text>
              <Text fontSize="18px">{user.email}</Text>
            </Flex>
            <Button>Edit</Button>
          </Flex>
          {/* Text Area */}
          <Textarea onChange={(e) => setTweet(e.target.value)} value={tweet} />
          <Flex justifyContent="end" my="4">
            <Button onClick={handleTweets}>Posting</Button>
          </Flex>
        </Box>
        <Box>
          {tweets.map((tweet) => {
            return (
              <CardTweet key={tweet.id} data={tweet} getTweets={getTweets} />
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
};

export default Profile;
