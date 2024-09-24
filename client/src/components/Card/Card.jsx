import { FlexBox, Button, Text } from "@ui5/webcomponents-react";
import React from "react";
import "./Card.css";

const Card = ({ DocData }) => {
  return (
    <FlexBox
      justifyContent="SpaceBetween"
      alignItems="Center"
      flexDirection="Row"
      className="card"
      key={DocData.docId}
    >
      <div>
        <Text style={{ fontSize: "1.3rem" }}>
          Paid By : <br />
          {DocData.receiverName}
        </Text>
        <Text>
          Document Date : <br />
          {DocData.documentDate}
        </Text>
      </div>
      <div>
        <Text style={{ fontSize: "1.3rem" }}> Date : {DocData.finished}</Text>
        <Text>
          fileName : <br />
          {DocData.fileName}
        </Text>
      </div>

      <Text style={{ fontSize: "1.3rem" }}>
        Total : <br />
        {DocData.grossAmount}
      </Text>
      <div>
        <Button
          key={DocData.docId}
          icon="edit"
          style={{ marginBottom: ".5rem" }}
        ></Button>
        <br />
        <Button key={DocData.docId} icon="delete"></Button>
      </div>
    </FlexBox>
  );
};

export default Card;
