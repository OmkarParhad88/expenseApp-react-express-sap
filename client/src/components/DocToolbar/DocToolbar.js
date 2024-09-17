import React from 'react'
import {
  FlexBox,
  Button,
  FileUploader

} from '@ui5/webcomponents-react';
import '@ui5/webcomponents-icons/dist/search.js';

import { Link } from 'react-router-dom';
const DocToolbar = () => {

  const cancelFileSelection = (fileUploaderRef) => {
    fileUploaderRef.current.value = ""; // Clear the file input value
    setUploadedFileName(null); // Reset state to indicate no file is selected
  };

  // Reference for FileUploader to access the DOM element
  const fileUploaderRef = useRef(null);
  return (
    <FlexBox
      alignContent="center"
      direction="Row"
      justifyContent="End"
      maxWidth="100%"
      style={{ padding: "0.7em", gap: "0.5rem" }}
    >
      <FileUploader
        onChange={function _s(e) {

        }}

        ref={fileUploaderRef}
        onFileSizeExceed={function _s() { }}
        valueState="None"
        placeholder="Click here..."
      >


        <Button design="Negative" onClick={() => cancelFileSelection(fileUploaderRef)}>
          Cancel Selection
        </Button>
        <Button design="Emphasized" icon='create'>
          Upload file
        </Button>
      </FileUploader>

      <Button
        icon="refresh">Refresh</Button>


    </FlexBox>
  )
}

export default DocToolbar
