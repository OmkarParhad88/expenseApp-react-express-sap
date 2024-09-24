import { FlexBox, Button, Text } from "@ui5/webcomponents-react";
import React from "react";
import "./Card.css";

const Card = ({ DocData, editListItem, deleteListItem }) => {
  return (
    <li className="card" id={DocData.docId}>
      <FlexBox
        justifyContent="SpaceBetween"
        alignItems="Center"
        flexDirection="Row"
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
            icon="edit"
            style={{ marginBottom: ".5rem" }}
            onClick={editListItem}
          ></Button>
          <br />
          <Button
            // id={DocData.docId}
            onClick={deleteListItem}
            icon="delete"
          ></Button>
        </div>
      </FlexBox>
    </li>
  );
};

export default Card;
