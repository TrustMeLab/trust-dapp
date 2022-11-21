import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import axios from "axios";

function SignUp() {
  // const callApi = async () =>
  //   await axios
  //     .get("http://localhost:4000/starton")
  //     .then((data: any) => console.log("DATA  FROM APi>>", data))
  //     .catch((err) => console.log(err));

  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = async () => {
    const { ethereum }: any = window;
    //Check if metamask installed
    if (!ethereum) {
      console.log("Make sure Metamask installed");
    } else console.log("Wallet exist!s");

    //check accounts in my wallets
    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account: ", account);
      setCurrentAccount(account);
    } else {
      console.log("No authorized account found");
    }
  };

  // METAMASK
  const connectMetamaskHandler = async () => {
    const { ethereum }: any = window;
    if (!ethereum) {
      alert("Please install Metamask!");
    }
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account! Address: ", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const connectWalletHandler = async () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <Box>
      <Typography variant="h1">
        Veuillez connecter votre portefeuille crypto
      </Typography>
      <Box>
        <Button onClick={connectMetamaskHandler}>Metamask</Button>
      </Box>
      <Box>
        <Button onClick={connectWalletHandler}>WalletConnect</Button>
      </Box>
    </Box>
  );
}

export default SignUp;
