import {
  UploadCollection, UploadCollectionItem, Button, FlexBox,
  Text, Title, Icon, FileUploader
} from '@ui5/webcomponents-react';

import { Link } from 'react-router-dom';
import { useState, Children, cloneElement } from 'react';

const UploadState = {
  Ready: 'Ready',
  Uploading: 'Uploading',
  Complete: 'Complete',
};
const DocUploder = () => {
  const [children, setChildren] = useState([
    <UploadCollectionItem
      key={'0'}
      file={null}
      fileName={'file-name.txt'}
      uploadState={UploadState.Ready}
      thumbnail={
        <img src="https://raw.githubusercontent.com/SAP/ui5-webcomponents/main/docs/images/UI5_logo_water.png" />
      }
    >
      <Text>Uploaded by: Susanne Schmitt · Uploaded On: 2019-04-20</Text>
    </UploadCollectionItem>
  ]);
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.file;

    setChildren((prev) => [
      ...prev,
      <UploadCollectionItem
        key={file.name}
        file={file}
        fileName={file.name}
        uploadState={UploadState.Ready}
        thumbnail={<Icon name={document} />}
      >
        <Text>{`Last modified: ${file.lastModifiedDate} · Size: ${(file.size / 1000).toFixed(2)}KB`}</Text>
      </UploadCollectionItem>
    ]);

  };
  const simulateUpload = () => {
    if (children.length > 0) {
      Children.forEach(children, (child, index) => {
        if (child.props.uploadState === UploadState.Ready) {
          let progress = 0;
          const recTimeout = () => {
            setTimeout(
              () => {
                progress += Math.floor(Math.random() * 4) + 1;
                setChildren((prev) => {
                  const updatedChildren = [...prev];
                  updatedChildren[index] = cloneElement(prev[index], {
                    uploadState: UploadState.Uploading,
                    progress: Math.min(progress, 100)
                  });
                  return updatedChildren;
                });
                if (progress < 100) {
                  recTimeout();
                } else {
                  setChildren((prev) => {
                    const updatedChildren = [...prev];
                    updatedChildren[index] = cloneElement(prev[index], {
                      uploadState: UploadState.Complete
                    });
                    return updatedChildren;
                  });
                }
              },
              Math.floor(Math.random() * (1000 - 100 + 1)) + 100
            );
          };
          recTimeout();
        }
      });
    }

  }
  return (
    <FlexBox
      direction="Column"
      style={{ width: "100%", height: "90%" }}
    >

      <Link to="/">
        <Button >Cancel</Button>
      </Link>
    </FlexBox>
  )
}

export default DocUploder
