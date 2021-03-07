
function createDataset(fields, constraints, sortFields) {
	
	var c1 = null;
    var c2 = null;
    var filter = null;
    
    //log.info("<<< supplier_filters INICIO!");
    
    
    if (constraints.length > 0)
    {
    	
    	//log.info("<<< supplier_filters ENTROU CONSTRAINTS!");
    	
    	c1 = DatasetFactory.createConstraint("code", "%" + constraints[0].initialValue + "%" , "%" + constraints[0].finalValue + "%",  ConstraintType.SHOULD);
        c2 = DatasetFactory.createConstraint("name", "%" + constraints[0].initialValue + "%", "%" + constraints[0].finalValue + "%",  ConstraintType.SHOULD);
       
    	
    	//c2 = DatasetFactory.createConstraint("name", "%PARK%", "%PARK%",  ConstraintType.SHOULD);
    	
        //log.info("<<< supplier_filters constraints[0].initialValue:"+constraints[0].initialValue);
        //log.info("<<< supplier_filters constraints[0].finalValue:"+constraints[0].finalValue);
        
        c1.setLikeSearch(true);
        c2.setLikeSearch(true);
        filter = new Array (c1, c2);
    }//else{
    	//log.info("<<< supplier_filters NAO TEM CONSTRAINTS!");
   // }  
    
    var dataset = DatasetFactory.getDataset("supplier", null, filter, sortFields);
      
    return dataset;
	
}