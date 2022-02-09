import React, { useContext, useEffect } from "react";
import { Button, Typography, Avatar } from "antd";
import { auth, db } from "../../firebase/config";
import { AuthContext } from "../../Context/AuthProvider";
import styled from "styled-components";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  broder-bottom: 1px solid rhba(82, 38, 83);

  .username {
    color: white;
    margin-left: 5px;
  }
`;

function UserInfo() {
  const { displayName, photoURL } = useContext(AuthContext);

  return (
    <>
      <WrapperStyled>
        <div>
          <Avatar src={photoURL}>
            {photoURL ? "" : displayName?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Typography.Text className="username">{displayName}</Typography.Text>
        </div>
        <Button ghost onClick={() => auth.signOut()}>
          Logout
        </Button>
      </WrapperStyled>
    </>
  );
}

export default UserInfo;
