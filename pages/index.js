import { useWeb3React } from "@web3-react/core";
import { useEffect } from "react";
import { injected } from "../components/wallet/connectors";
import { Button } from "@mui/material";

export default function Home() {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React();

  async function connect() {
    try {
      await activate(injected);
      localStorage.setItem("isWalletConnected", true);
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", false);
    } catch (ex) {
      console.log(ex);
    }
  }

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", true);
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "500px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div>
        <Button
          variant="contained"
          onClick={connect}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Connect to MetaMask
        </Button>
        <br></br>
        {active ? (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Connected with <b>{account}</b>
          </span>
        ) : (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Not connected
          </span>
        )}
        <br></br>
        <Button
          variant="contained"
          onClick={disconnect}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
}
