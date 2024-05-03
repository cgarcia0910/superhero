export const SUPERHERO_CONFIG_TABLE = [
  {
      cellConfig: {cellType: 'th', tdClass: '', thClass: ''},
      header: {label: 'Name', id: 'nameLabel'},
      data: {
          fields: [
              {
              cols: [
                  {
                      field: ['nameLabel']
                  }
              ]
              }
          ]
      }
  },
  {
      cellConfig: {cellType: 'th', tdClass: '', thClass: ''},
      header: {label: [['Gender']], id: 'genderLabel', showChart: true},
      data: {
          fields: [
              {
              cols: [
                  {
                      field: ['genderLabel']
                  }
              ]
              }
          ]
      }
  },
  {
      cellConfig: {cellType: 'th', tdClass: '', thClass: ''},
      header: {label: [['Citizenship']], id: 'citizenshipLabel', showChart: true},
      data: {
          fields: [
              {
              cols: [
                  {
                      field: ['citizenshipLabel']
                  }
              ]
              }
          ]
      }
  },
  {
      cellConfig: {cellType: 'th', tdClass: '', thClass: ''},
      header: {label: [['Skills']], id: 'skillsLabel', showChart: true},
      data: {
          fields: [
              {
              cols: [
                  {
                      field: ['skillsLabel']
                  }
              ]
              }
          ]
      }
  },
  {
      cellConfig: {cellType: 'th', tdClass: '', thClass: ''},
      header: {label: [['Occupation']], id: 'occupationLabel', showChart: true},
      data: {
          fields: [
              {
              cols: [
                  {
                      field: ['occupationLabel']
                  }
              ]
              }
          ]
      }
  },
  {
      cellConfig: {cellType: 'th', tdClass: '', thClass: ''},
      header: {label: [['Member of']], id: 'memberOfLabel', showChart: true},
      data: {
          fields: [
              {
              cols: [
                  {
                      field: ['memberOfLabel']
                  }
              ]
              }
          ]
      }
  },
  {
      cellConfig: {cellType: 'th', tdClass: '', thClass: ''},
      header: {label: [['Creator']], id: 'creatorLabel', showChart: true},
      data: {
          fields: [
              {
              cols: [
                  {
                      field: ['creatorLabel']
                  }
              ]
              }
          ]
      }
  },
  {
      cellConfig: {cellType: 'th', tdClass: '', thClass: ''},
      header: {label: [['']], id: 'view', showChart: false},
      data: {
          fields: [
              {
              cols: [
                  {
                      cellType: 'ICON_BUTTON',
                      extra: {event: 'view-superhero', icon: 'visibility icon', color:'primary'},
                      field: ['']
                  }
              ]
              }
          ]
      }
  },
  {
      cellConfig: {cellType: 'th', tdClass: '', thClass: ''},
      header: {label: [['']], id: 'edit', showChart: false},
      data: {
          fields: [
              {
              cols: [
                  {
                      cellType: 'ICON_BUTTON',
                      extra: {event: 'edit-superhero', icon: 'mode edit', color:'primary'},
                      field: ['']
                  }
              ]
              }
          ]
      }
  },
  {
      cellConfig: {cellType: 'th', tdClass: '', thClass: ''},
      header: {label: [['']], id: 'delete', showChart: false},
      data: {
          fields: [
              {
              cols: [
                  {
                      cellType: 'ICON_BUTTON',
                      extra: {event: 'delete-superhero', icon: 'delete', color:'warn'},
                      field: ['']
                  }
              ]
              }
          ]
      }
  },
]