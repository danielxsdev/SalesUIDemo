sap.ui  
    .jsview(  
        "salesuidemo.toHome", {  
            /** 
             * Specifies the Controller belonging to this View. In the case that it is 
             * not implemented, or that "null" is returned, this View does not have a 
             * Controller. 
             * 
             * @memberOf salesuidemo.toHome 
             */  
            getControllerName: function() {  
                return "salesuidemo.toHome";  
            },  
            /** 
             * Is initially called once after the Controller has been instantiated. It 
             * is the place where the UI is constructed. Since the Controller is given 
             * to this method, its event handlers can be attached right away. 
             * 
             * @memberOf salesuidemo.toHome 
             */  
            createContent: function(oController) {  
                // Create a TabStrip instance  
                var oAutoMTabStrip = new sap.ui.commons.TabStrip(  
                    "TabStrip1");  
                oAutoMTabStrip.setWidth("900px");  
                oAutoMTabStrip.setHeight("500px");  
                oAutoMTabStrip.setEnableTabReordering(true);  
                oAutoMTabStrip.attachClose(function(oEvent) {  
                    var oTabStrip = oEvent.oSource;  
                    oTabStrip.closeTab(oEvent.getParameter("index"));  
                });  
                // 1. tab: general data (use createTab)  
                var oAutoMLayout = new sap.ui.commons.layout.MatrixLayout(  
                    "Matrix1", {  
                        columns: 2,  
                        width: "100%"  
                    });  
                oAutoMLayout.setWidths(['150px']);  
                var sURI = 'http://hostname:8000/SalesAutoDemo/services/salesOData.xsodata/';  
                var oModel = new sap.ui.model.odata.ODataModel(sURI,  
                    true, "USERNAME", "PASSWORD");  
                var colorBar = "#728C00";  
                // A Dataset defines how the model data is mapped to the chart  
                var oDataset = new sap.viz.ui5.data.FlattenedDataset({  
                    // it can show multiple measures, each results in a new set of bars  
                    // in a new color  
                    measures: [  
                        // measure 1  
                        {  
                            axis: 2,  
                            name: 'Sales', // 'name ' is used as label in the Legend  
                            value: '{Sales}' // 'value' defines the binding for the  
                            // displayed value  
                        }  
                    ],  
                    // a Bar Chart requires exactly one dimension (x-axis)  
                    dimensions: [{  
                        axis: 1, // must be one for the x-axis, 2 for y-axis  
                        name: 'Auto Mobile Name',  
                        value: "{AutoMobileName}"  
                    }],  
                    // 'data' is used to bind the whole data collection that is to be  
                    // displayed in the chart  
                    data: {  
                        path: "/SALES_DISPLAYLIST"  
                    }  
                });  
                // create a Bar chart  
                var oBarChart = new sap.viz.ui5.Bar({  
                    width: "100%",  
                    height: "400px",  
                    plotArea: {  
                        drawingEffect: sap.viz.ui5.types.Bar_drawingEffect.glossy,  
                        isRoundCorner: true,  
                        colorPalette: [colorBar]  
                    },  
                    title: {  
                        visible: true,  
                        text: 'AutoMobile Sales Report '  
                    },  
                    dataset: oDataset  
                });  
                // attach the model to the chart and display it  
                oBarChart.setModel(oModel);  
                oAutoMTabStrip.createTab("AutoMobiles Report",  
                    oBarChart);  
                // 2. tab: AutoMobiles Details Display (use separate tab element)  
                oAutoMobilesTab = new sap.ui.commons.Tab("tab3");  
                oAutoMobilesTab  
                    .setTooltip("AutoMobiles Details Display");  
                oAutoMobilesTab.setTitle(new sap.ui.core.Title(  
                    "Title3", {  
                        text: "AutoMobiles Details Display"  
                    }));  
                // Create an instance of the table control  
                var oAutoMListTable = new sap.ui.table.Table({  
                    title: "AutoMobiles Details Display",  
                    visibleRowCount: 7,  
                    firstVisibleRow: 3,  
                    selectionMode: sap.ui.table.SelectionMode.Single,  
                    navigationMode: sap.ui.table.NavigationMode.Paginator,  
                    fixedColumnCount: 2  
                });  
                // Define the columns and the control templates to be used  
                oAutoMListTable.addColumn(new sap.ui.table.Column({  
                    label: new sap.ui.commons.Label({  
                        text: "AutoM ID"  
                    }),  
                    template: new sap.ui.commons.TextView()  
                        .bindProperty("text", "AutoMobileId"),  
                    sortProperty: "AutoMobileId",  
                    filterProperty: "AutoMobileId",  
                    width: "100px",  
                    hAlign: "Center"  
                }));  
                oAutoMListTable.addColumn(new sap.ui.table.Column({  
                    label: new sap.ui.commons.Label({  
                        text: "AutoMobile Name"  
                    }),  
                    template: new sap.ui.commons.TextField()  
                        .bindProperty("value", "AutoMobileName"),  
                    sortProperty: "AutoMobileName",  
                    filterProperty: "AutoMobileName",  
                    width: "200px",  
                    hAlign: "Center"  
                }));  
                oAutoMListTable.addColumn(new sap.ui.table.Column({  
                    label: new sap.ui.commons.Label({  
                        text: "CC"  
                    }),  
                    template: new sap.ui.commons.TextField()  
                        .bindProperty("value", "AutoMobileCC"),  
                    sortProperty: "AutoMobileCC",  
                    filterProperty: "AutoMobileCC",  
                    width: "75px",  
                    hAlign: "Center"  
                }));  
                oAutoMListTable.addColumn(new sap.ui.table.Column({  
                    label: new sap.ui.commons.Label({  
                        text: "Body Type"  
                    }),  
                    template: new sap.ui.commons.TextField()  
                        .bindProperty("value", "AutoMobileType"),  
                    sortProperty: "AutoMobileType",  
                    filterProperty: "AutoMobileType",  
                    width: "75px",  
                    hAlign: "Center"  
                }));  
                oAutoMListTable.addColumn(new sap.ui.table.Column({  
                    label: new sap.ui.commons.Label({  
                        text: "Fuel Type"  
                    }),  
                    template: new sap.ui.commons.TextField()  
                        .bindProperty("value", "AutoMobileFuel"),  
                    sortProperty: "AutoMobileFuel",  
                    filterProperty: "AutoMobileFuel",  
                    width: "75px",  
                    hAlign: "Center"  
                }));  
                oAutoMListTable.addColumn(new sap.ui.table.Column({  
                    label: new sap.ui.commons.Label({  
                        text: "Mileage"  
                    }),  
                    template: new sap.ui.commons.TextField()  
                        .bindProperty("value",  
                            "AutoMobileMileage"),  
                    sortProperty: "AutoMobileMileage",  
                    filterProperty: "AutoMobileMileage",  
                    width: "75px",  
                    hAlign: "Center"  
                }));  
                oAutoMListTable.addColumn(new sap.ui.table.Column({  
                    label: new sap.ui.commons.Label({  
                        text: "Color"  
                    }),  
                    template: new sap.ui.commons.TextField()  
                        .bindProperty("value", "AutoMobileColor"),  
                    sortProperty: "AutoMobileColor",  
                    filterProperty: "AutoMobileColor",  
                    width: "100px",  
                    hAlign: "Center"  
                }));  
                var sURI = 'http://hostname:8000/SalesAutoDemo/services/salesOData.xsodata/';  
                var oModel = new sap.ui.model.odata.ODataModel(sURI,  
                    true, "USERNAME", "PASSWORD");  
                oAutoMListTable.setModel(oModel);  
                oAutoMListTable.bindRows("/SALES_DISPLAYLIST");  
                oAutoMobilesTab.addContent(oAutoMListTable);  
                oAutoMTabStrip.addTab(oAutoMobilesTab)  
                // 3. tab: address data (use separate tab element)  
                oAddNewAutoMTab = new sap.ui.commons.Tab("tab2");  
                oAddNewAutoMTab.setTooltip("Add New AutoMobile");  
                oAddNewAutoMTab.setTitle(new sap.ui.core.Title(  
                    "Title2", {  
                        text: "Add New AutoMobile"  
                    }));  
                var oLayout2 = new sap.ui.layout.form.GridLayout("L2");  
                var oForm2 = new sap.ui.layout.form.Form(  
                    "F2", {  
                        title: new sap.ui.core.Title({  
                            text: "AutoMobile Details",  
                            tooltip: "AutoMobile Details"  
                        }),  
                        editable: true,  
                        layout: oLayout2,  
                        formContainers: [  
                            new sap.ui.layout.form.FormContainer(  
                                "C7", {  
                                    title: "Add AutoMobile Details",  
                                    formElements: [  
                                        new sap.ui.layout.form.FormElement({  
                                            label: "AutoMobile ID",  
                                            fields: [new sap.ui.commons.TextField({  
                                                value: "DISABLED",  
                                                enabled: false,  
                                                layoutData: new sap.ui.layout.form.GridElementData({  
                                                    hCells: "2"  
                                                })  
                                            })]  
                                        }),  
                                        new sap.ui.layout.form.FormElement({  
                                            label: "AutoMobile Name",  
                                            fields: [new sap.ui.commons.TextField({  
                                                id: 'autoMobileName',  
                                                value: '',  
                                                layoutData: new sap.ui.layout.form.GridElementData({  
                                                    hCells: "2"  
                                                })  
                                            })]  
                                        }),  
                                        new sap.ui.layout.form.FormElement({  
                                            label: "AutoMobile CC",  
                                            fields: [new sap.ui.commons.TextField({  
                                                id: 'autoMobileCC',  
                                                value: '',  
                                                layoutData: new sap.ui.layout.form.GridElementData({  
                                                    hCells: "2"  
                                                })  
                                            })]  
                                        }),  
                                        new sap.ui.layout.form.FormElement({  
                                            label: "AutoMobile Type",  
                                            fields: [new sap.ui.commons.TextField({  
                                                id: 'autoMobileType',  
                                                value: '',  
                                                layoutData: new sap.ui.layout.form.GridElementData({  
                                                    hCells: "2"  
                                                })  
                                            })]  
                                        }),  
                                        new sap.ui.layout.form.FormElement({  
                                            label: "AutoMobile Fuel",  
                                            fields: [new sap.ui.commons.TextField({  
                                                id: 'autoMobileFuel',  
                                                value: '',  
                                                layoutData: new sap.ui.layout.form.GridElementData({  
                                                    hCells: "2"  
                                                })  
                                            })]  
                                        }),  
                                        new sap.ui.layout.form.FormElement({  
                                            label: "AutoMobile Mileage",  
                                            fields: [new sap.ui.commons.TextField({  
                                                id: 'autoMobileMileage',  
                                                value: '',  
                                                layoutData: new sap.ui.layout.form.GridElementData({  
                                                    hCells: "2"  
                                                })  
                                            })]  
                                        }),  
                                        new sap.ui.layout.form.FormElement({  
                                            label: "AutoMobile Color",  
                                            fields: [new sap.ui.commons.TextField({  
                                                id: 'autoMobileColor',  
                                                value: '',  
                                                layoutData: new sap.ui.layout.form.GridElementData({  
                                                    hCells: "2"  
                                                })  
                                            })]  
                                        }),  
                                    ]  
                                }),  
                            new sap.ui.layout.form.FormContainer(  
                                "C11", {  
                                    formElements: [  
                                        new sap.ui.layout.form.FormElement({  
                                            label: ""  
                                        }),  
                                        new sap.ui.layout.form.FormElement({  
                                            fields: [  
                                                new sap.ui.commons.Button({  
                                                    text: "Add AutoMobile",  
                                                    tooltip: "Add AutoMobile",  
                                                    /* 
                                                     * press : function() { 
                                                     * alert("AddAutoMobile"); }, 
                                                     */  
                                                    layoutData: new sap.ui.layout.form.GridElementData({  
                                                        hCells: "3"  
                                                    })  
                                                }),  
                                                new sap.ui.commons.Button({  
                                                    text: "Cancel AutoMobile",  
                                                    tooltip: "Cancel AutoMobile",  
                                                    /* 
                                                     * press : function() { alert("Cancel"); }, 
                                                     */  
                                                    layoutData: new sap.ui.layout.form.GridElementData({  
                                                        hCells: "3"  
                                                    })  
                                                })  
                                            ]  
                                        }),  
                                    ]  
                                })  
                        ]  
                    })  
                oAddNewAutoMTab.addContent(oForm2);  
                oAutoMTabStrip.addTab(oAddNewAutoMTab);  
                // Attach the TabStrip to the page  
                oAutoMTabStrip.placeAt("content");  
            }  
        }); 