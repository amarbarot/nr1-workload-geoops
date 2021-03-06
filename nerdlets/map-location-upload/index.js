import React from 'react';
import styled from 'styled-components';

import { NerdletStateContext, navigation } from 'nr1';

import MapLocationFilesUpload from './MapLocationFilesUpload';
import { PACKAGE_UUID } from '../shared/constants';

const FileUploadContainer = styled.div`
  height: 100%;
  padding: 56px;
`;

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export default class MapLocationUploadNerdlet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };

    this.fileInput = React.createRef();
  }

  fileInputOnChange(event) {
    const fileList = event.target.files;
    this.setState({ files: Array.from(fileList) });
  }

  closeFileUploadNerdlet() {
    navigation.openLauncher(
      {
        id: `${PACKAGE_UUID}.geo-ops`,
        nerdlet: {
          id: `${PACKAGE_UUID}.geo-ops-nerdlet`,
          urlState: {
            hasNewLocations: true
          }
        }
      },
      { replaceHistory: true }
    );
  }

  render() {
    const { files } = this.state;

    return (
      <FileUploadContainer>
        <Input
          ref={this.fileInput}
          type="file"
          className="u-unstyledInput"
          accept=".json"
          id="location-upload"
          onChange={event => {
            this.fileInputOnChange(event);
          }}
          onClick={event => {
            event.target.value = null;
          }}
        />
        <NerdletStateContext.Consumer>
          {nerdletState => {
            const { map: mapGuid, accountId } = nerdletState;

            // TODO: if we don't have these, because of weird user navigation - show inputs to capture these
            // console.log(mapGuid);
            // console.log(accountId);

            return (
              <>
                {files && (
                  <MapLocationFilesUpload
                    accountId={accountId}
                    mapGuid={mapGuid}
                    files={files}
                    onAddFileMapLocations={this.onAddFileMapLocations}
                    onClose={() => this.closeFileUploadNerdlet()}
                  />
                )}
              </>
            );
          }}
        </NerdletStateContext.Consumer>
      </FileUploadContainer>
    );
  }
}
