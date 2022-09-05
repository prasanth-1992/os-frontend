import React from 'react';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';


export function CustomDataTable({ data, columns, title, options }) {

  const getMuiTheme = () => createTheme({
    overrides: {
      MuiPaper: {
        elevation4: {
          width: '100%'
        }
      },
      MUIDataTableFilterList: {
        chip: {
          margin: 5
        }
      },
      MuiChip: {
        root: {
          margin: 5
        }
      },
      MUIDataTableBodyRow: {
        root: {
          '&:nth-child(even)': {
            backgroundColor: '#f9f8f8'
          }
        }
      },
      MUIDataTable: {
        tableRoot: {
          margin: 0
        },
        responsiveBase: {
          marginTop: 0,
          marginLeft: 30,
          marginRight: 30,
        },
        responsiveStacked:{
          margin:'10px'
        }
      },
      MuiTableCell: {
        root: {
          padding: 5
        }
      },
      MuiButton: {
        root: { padding: 0 },
        label: {
          whiteSpace: "nowrap",
        }
      },
      MuiFormControlLabel: {
        root: {
          margin: 0,
          marginRight: 0
        }
      },
      MUIDataTableHeadCell: {
        root: {
          backgroundColor: '#f5f4f4 !important',
          outline: '1px solid rgba(224,224,224,1)',
          // boxShadow:'inset 0 0 0.01em 0.06em rgb(0 0 0 / 10%), 0 0 0 2px rgb(255 255 255), 0.1em 0.1em 0.1em rgb(0 0 0 / 30%)'
        },
        data: {
          fontWeight: 'bold',
          textAlign: 'center',
          paddingLeft: 5,
          padding: 0
        },
        toolButton: {
          marginLeft: 0
        },
        contentWrapper: {
          // boxShadow:' inset 0 -3em 3em rgba(0,0,0,0.1), 0 0  0 2px rgb(255,255,255),0.3em 0.3em 1em rgba(0,0,0,0.3)',
          // boxShadow: '0 5px 5px rgb(0 0 0 / 0.1)',
          textAlign: 'center',
        }
      },
      MUIDataTableBodyCell: {
        root: {
          fontWeight: '400',
          whiteSpace: "nowrap",
          padding: 3,
          margin: 7,
          paddingLeft: 5,
          overflow: 'hidden',
          '&:nth-child(1)': {
            // outline: '1px solid rgba(224,224,224,1)',
            root: {
              '&:nth-child(even)': {
                backgroundColor: '#f9f8f8 !important'
              },
            },
            // backgroundColor: '#f5f4f4 !important',
            boxShadow: 'inset 0 0 0.01em 0.06em rgb(0 0 0 / 10%), 0 0 0 2px rgb(255 255 255), 0.1em 0.1em 0.1em rgb(0 0 0 / 30%)',
          },
        }
      },
      MUIDataTableFilter: {
        root: {
          width: '600px'
        }
      },
      MuiList: {
        root: {
          height: '200px'
        }
      }
    }
  })

  const option = {
    filter: true,
    filterType: 'multiselect',
    responsive: 'simple',
    fixedHeader: true,
    fixedSelectColumn: true,
    print:false,
    tableBodyMaxHeight: '400px',
    selectableRows: 'none',
  };

  return (
    <MuiThemeProvider theme={getMuiTheme()}>
      <MUIDataTable
        data={data}
        columns={columns}
        options={options ? options : option}
        title={title || ""}
      />
    </MuiThemeProvider>
  )
}
