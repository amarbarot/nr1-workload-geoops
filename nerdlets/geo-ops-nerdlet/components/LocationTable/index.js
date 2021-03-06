import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import { Icon } from 'nr1';

import { StatusColor, LocationTableContainer } from './styles';

export default class LocationTable extends Component {
  static propTypes = {
    mapLocations: PropTypes.array
  };

  statusFormatter() {
    return <StatusColor />;
  }

  favoriteFormatter(cell) {
    return (
      <div className="favorite-button">
        <Icon
          type={
            cell
              ? Icon.TYPE.PROFILES__EVENTS__FAVORITE__WEIGHT_BOLD
              : Icon.TYPE.PROFILES__EVENTS__FAVORITE
          }
          color={cell ? '#FFB951' : '#d5d7d7'}
        />
      </div>
    );
  }

  getColumns() {
    return [
      {
        dataField: 'document.externalId',
        text: 'ExID',
        sort: true
      },
      {
        dataField: 'document.title',
        text: 'Title',
        sort: true
      },
      {
        dataField: 'document.location.lat',
        text: 'Latitude',
        sort: true
      },
      {
        dataField: 'document.location.lng',
        text: 'Longitude',
        sort: true
      },
      {
        dataField: 'document.location.municipality',
        text: 'Municipality',
        sort: true
      },
      {
        dataField: 'document.location.region',
        text: 'Region',
        sort: true
      },
      {
        dataField: 'document.location.country',
        text: 'Country',
        sort: true
      },
      {
        dataField: 'document.location.postalCode',
        text: 'Postal Code',
        sort: true
      }
    ];
  }

  render() {
    const { SearchBar } = Search;
    const { mapLocations: data } = this.props;
    const columns = this.getColumns();

    const hasData = data.length > 0;

    return (
      <>
        {hasData && (
          <ToolkitProvider
            keyField="document.externalId"
            data={data}
            columns={columns}
            search
          >
            {props => (
              <LocationTableContainer>
                <SearchBar {...props.searchProps} />
                <BootstrapTable {...props.baseProps} bordered={false} />
              </LocationTableContainer>
            )}
          </ToolkitProvider>
        )}
      </>
    );
  }
}
