import { FlexBox, Button, Text } from "@ui5/webcomponents-react";
import React from "react";
import "./Card.css";

const Card = ({ DocData, editListItem, deleteListItem }) => {
  // console.log(DocData);
  return (
    <li className="card" id={DocData.DOCID}>
      <FlexBox
        justifyContent="SpaceBetween"
        alignItems="Center"
        style={{ width: "100%" }}
      >
        <div>
          <Text className="RECEIVERNAME " style={{ fontSize: "1.3rem" }}>
            Paid By : <br />
            {DocData.RECEIVERNAME}
          </Text>
          <Text>
            Document Date : <br />
            {DocData.DOCUMENTDATE}
          </Text>
        </div>
        <div>
          <Text style={{ fontSize: "1.3rem" }}> Date : {DocData.FINISHED}</Text>
          <Text>
            fileName : <br />
            {DocData.FILENAME}
          </Text>
        </div>

        <Text style={{ fontSize: "1.3rem" }}>
          Total Amount : <br />
          {DocData.GROSSAMOUNT}
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
