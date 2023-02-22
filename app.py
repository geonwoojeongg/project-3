import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import datetime as dt

from flask import Flask, jsonify


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///data.sqlite")

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(autoload_with=engine)

# Save reference to the table
watson_healthcare_data = Base.classes.watson_healthcare_data

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
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/YYYY-MM-DD(for start date)<br/>"
        f"/api/v1.0/YYYY-MM-DD(start date)/YYYY-MM-DD(end date)"
    )

@app.route("/api/v1.0/precipitation")
def precipitation():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of Measurement.date, Measurement.prcp"""
    # Query
    yearago = dt.date(2017, 8, 23) - dt.timedelta(days=365)

    results = session.query(Measurement.date, Measurement.prcp).\
        filter(Measurement.date > yearago).\
        order_by(Measurement.date).all() 

    session.close()

    precipitation = []
    for date, prcp in results:
        prcp_dict = {}
        prcp_dict["date"] = date
        prcp_dict["prcp"] = prcp
        precipitation.append(prcp_dict)

    return jsonify(precipitation)


@app.route("/api/v1.0/stations")
def stations():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query
    results = session.query(Measurement.station).all()

    session.close()

 # Convert list of tuples into normal list
    stations = list(np.ravel(results))

    return jsonify(stations)

@app.route("/api/v1.0/tobs")
def tobs():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query
    ma_yearago = dt.date(2017, 8, 18) - dt.timedelta(days=365)

    results = session.query(Measurement.date, Measurement.tobs).\
        filter(Measurement.date > ma_yearago).\
        filter(Measurement.station == 'USC00519281').\
        order_by(Measurement.date).all() 
    
    session.close()

 # Convert to list
    tobs = list(np.ravel(results))

    return jsonify(tobs)

@app.route("/api/v1.0/<start>")
def temperature_s(start):
    session = Session(engine)

    # Set start and end dates for date range
    startDate = dt.datetime.strptime(start, "%Y-%m-%d")
    endDate = dt.datetime.strptime("2017-08-23", "%Y-%m-%d")

    # Date range
    # Getting date range
    delta = endDate - startDate
    date_range = []
    for i in range(delta.days + 1):
        date_range.append(startDate + dt.timedelta(days=i))
    
    # Converting to strings to filter
    str_date_range = []
    for date in date_range:
        new_date = date.strftime("%Y-%m-%d")
        str_date_range.append(new_date)

    # Grabbing avg, min & max temps    
    temp_avg = session.query(func.avg(Measurement.tobs))\
                .filter(Measurement.date.in_(str_date_range))[0][0]
    temp_min = session.query(func.min(Measurement.tobs))\
                .filter(Measurement.date.in_(str_date_range))[0][0]
    temp_max = session.query(func.max(Measurement.tobs))\
                .filter(Measurement.date.in_(str_date_range))[0][0]

    # Dictionary of temperatures
    temp_dict = {}
    temp_dict["Average Temperature"] = temp_avg
    temp_dict["Minimum Temperature"] = temp_min
    temp_dict["Maximum Temperature"] = temp_max

    return jsonify(temp_dict)

@app.route("/api/v1.0/<start>/<end>")
def temperature(start, end):
    session = Session(engine)

    # Set start and end dates for date range
    startDate = dt.datetime.strptime(start, "%Y-%m-%d")
    endDate = dt.datetime.strptime(end, "%Y-%m-%d")

    # Date range
    # Getting date range
    delta = endDate - startDate
    date_range = []
    for i in range(delta.days + 1):
        date_range.append(startDate + dt.timedelta(days=i))
    
    # Converting to strings to filter
    str_date_range = []
    for date in date_range:
        new_date = date.strftime("%Y-%m-%d")
        str_date_range.append(new_date)

    # Grabbing avg, min & max temps    
    temp_avg = session.query(func.avg(Measurement.tobs))\
                .filter(Measurement.date.in_(str_date_range))[0][0]
    temp_min = session.query(func.min(Measurement.tobs))\
                .filter(Measurement.date.in_(str_date_range))[0][0]
    temp_max = session.query(func.max(Measurement.tobs))\
                .filter(Measurement.date.in_(str_date_range))[0][0]

    # Dictionary of temperatures
    temp_dict = {}
    temp_dict["Average Temperature"] = temp_avg
    temp_dict["Minimum Temperature"] = temp_min
    temp_dict["Maximum Temperature"] = temp_max

    return jsonify(temp_dict)

if __name__ == '__main__':
    app.run(debug=True)