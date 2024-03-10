import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {format} from "timeago.js"

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 16px;
`;

const Image = styled.img`
  width: 100%;
  display: block;
  height: ${(props) => (props.type === "sm" ? "120px" : "250px")};
  background-color: #999;
  object-fit: cover;
  flex: 1;
`;

const Details = styled.div`
  display: flex;
  gap: 12px;
  flex: 1;
  padding: 16px;
`;

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const Card = ({ type, video }) => {
  const [channel, setChannel] = useState([]);

  useEffect(() => {
    const fetchChannel = async () => {
      const result = await axios.get(`/users/${video.userId}`);
      setChannel(result.data);
    }
    fetchChannel();
  }, [video.userId])

  console.log(video)
  
  return (
    <Link to={`/video/${video._id}`} style={{
      display: "block",
      marginBottom: "16px",
      textDecoration: "none",
      borderRadius: "6px",
      overflow: "hidden",
      backgroundColor: "rgba(255,255,255, 0.06)"
    }}>
      <Container type={type}>
        <Image
          type={type}
          src={video.imgUrl}
        />
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel && channel.img}
          />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel && channel.name}</ChannelName>
            <Info>{video.views} views • {format(video.createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;