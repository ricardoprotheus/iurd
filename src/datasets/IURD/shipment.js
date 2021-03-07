function createDataset(fields, constraints, sortFields) {
		                                                                        
	var newDataset = DatasetBuilder.newDataset();
	
	newDataset.addColumn("type");
	newDataset.addRow(new Array("CIF"));	
	newDataset.addRow(new Array("FOB"));
	newDataset.addRow(new Array("Due to Third Party"));
	newDataset.addRow(new Array("No freight"));
	
	return newDataset;
	
}