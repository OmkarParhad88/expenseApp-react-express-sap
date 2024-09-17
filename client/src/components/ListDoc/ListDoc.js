import {
  AnalyticalTable,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxAlignItems,
  FlexBoxDirection,
  Button,
  Tag,
  Text,
} from '@ui5/webcomponents-react';
// import { AnalyticalTableSubComponentsBehavior } from '@ui5/webcomponents-react';
import TableData from "../../Data/TableData.json";


const ListDoc = () => {
  const renderRowSubComponent = (row) => {
    if (row.id === '0') {
      return (
        <FlexBox
          style={{ backgroundColor: 'lightblue', height: '300px' }}
          justifyContent={FlexBoxJustifyContent.Center}
          alignItems={FlexBoxAlignItems.Center}
          direction={FlexBoxDirection.Column}
        >
          <Tag>height: 300px</Tag>
          <Text>This subcomponent will only be displayed below the first row.</Text>
          <hr />
          <Text>
            The button below is rendered with `data-subcomponent-active-element` attribute to ensure consistent focus
            behavior
          </Text>
          <Button data-subcomponent-active-element>Click</Button>
        </FlexBox>
      );
    }
  };
  return (
    <>
      <AnalyticalTable
        style={{ width: "100%" }}

        columns={[
          {
            Header: 'Expense Type',
            accessor: 'name',
            headerTooltip: 'Full Name'
          },
          {
            Header: 'Date',
            accessor: 'age',
            hAlign: 'End'
          },
          {
            Header: 'Paid By',
            accessor: 'friend.name'
          },
          {

            hAlign: 'End',
            Header: "Expense Amount"

          },
          {
            Cell: (instance) => {
              const { cell, row, webComponentsReactProperties } = instance;
              // disable buttons if overlay is active to prevent focus
              const isOverlay = webComponentsReactProperties.showOverlay;
              // console.log('This is your row data', row.original);
              return (
                <FlexBox>
                  <Button icon="edit" disabled={isOverlay} />
                  <Button icon="delete" disabled={isOverlay} />
                </FlexBox>
              );
            },
            cellLabel: ({ cell }) => {
              // `cell.cellLabel` contains the internal `aria-label` of the respective cell
              return `${cell.cellLabel} press TAB to focus active elements inside this cell`;
            },
            Header: 'Actions',
            hAlign: 'End',
            accessor: '.',
            id: 'actions',
            width: 100
          }
        ]}
        data={TableData}
        filterable
        groupBy={[]}
        groupable
        header="Bills"
        infiniteScroll
        onColumnsReorder={() => { }}
        onGroup={() => { }}
        onLoadMore={() => { }}
        onRowClick={() => { }}
        onRowExpandChange={() => { }}
        onRowSelect={() => { }}
        onSort={() => { }}
        onTableScroll={() => { }}
        rowHeight={60}
        selectedRowIds={{
          3: true
        }}
        // selectionMode="Multiple"
        renderRowSubComponent={renderRowSubComponent}
        scaleWidthMode="Auto"
      />



    </>
  );

}

export default ListDoc
