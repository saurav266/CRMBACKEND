import Department from "../model/deparment.js";
const addDeepartment = async (req, res) => {
    try{
        const { dp_name, description } = req.body;

        const newDep=new Department({
            dp_name,
            description
        });
        await newDep.save();
        
        // Here you would typically add code to save the department to the database
        res.status(201).json({ message: "Department added successfully", department: { name, description } });
    }
    catch(error){
        res.status(500).json({message:"Deparment Server error",error:error.message});
    }
    
}

export { addDeepartment };