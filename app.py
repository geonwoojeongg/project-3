import numpy as np

import os

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///health.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the tables.
Healthcare = Base.classes.healthcare

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################
@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"<h1>Welcome to the Healthcare HR App API!</h1>"
        f'<img src="https://techcrunch.com/wp-content/uploads/2020/09/GettyImages-1211152561.jpg?w=1390&crop=1" align="middle" />'
        f"<h2>Here are the routes available:</h2>"
        f"HR Healthcare info: /api/v1.0/health<br/>"
        f"Direct Link: http://127.0.0.1:5000/api/v1.0/health"
    )

@app.route('/api/v1.0/health')
def precipitation():
    session = Session(engine)
    health_selection = [Healthcare.EmployeeID, Healthcare.Age, Healthcare.Attrition, Healthcare.Department, Healthcare.DistanceFromHome,
    Healthcare.Gender, Healthcare.HourlyRate, Healthcare.JobSatisfaction, Healthcare.MaritalStatus, Healthcare.TotalWorkingYears]
    query_result = session.query(*health_selection).all()
    session.close()

    all_health_info = []
    for EmployeeID,Age,Attrition,Department,DistanceFromHome,Gender,HourlyRate,JobSatisfaction,MaritalStatus,TotalWorkingYears in query_result:
        health_dict = {}
        health_dict["EmployeeID"] = EmployeeID
        health_dict["Age"] = Age
        health_dict["Attrition"] = Attrition
        health_dict["Department"] = Department
        health_dict["DistanceFromHome"] = DistanceFromHome
        health_dict["Gender"] = Gender
        health_dict["HourlyRate"] = HourlyRate
        health_dict["JobSatisfaction"] = JobSatisfaction
        health_dict["MaritalStatus"] = MaritalStatus
        health_dict["TotalWorkingYears"] = TotalWorkingYears

        all_health_info.append(health_dict)

    return jsonify(all_health_info)


if __name__ == '__main__':
    app.run(debug=True)