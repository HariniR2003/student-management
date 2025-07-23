from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId

app = Flask(__name__)
CORS(app)

# Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client["student_db"]
students_collection = db["students"]

# Helper to convert MongoDB _id to string
def student_to_json(student):
    return {
        "_id": str(student["_id"]),
        "name": student["name"],
        "age": student["age"],
        "course": student["course"],
        "grade": student["grade"]
    }

# Get all students
@app.route('/api/students', methods=['GET'])
def get_students():
    students = list(students_collection.find())
    return jsonify([student_to_json(student) for student in students])

# Add a student
@app.route("/api/students", methods=["POST"])
def add_student():
    data = request.get_json()
    if not all(k in data for k in ("name", "age", "course", "grade")):
        return jsonify({"error": "Missing fields"}), 400
    result = students_collection.insert_one(data)
    new_student = students_collection.find_one({"_id": result.inserted_id})
    return jsonify(student_to_json(new_student)), 201

# Update a student
@app.route("/api/students/<string:student_id>", methods=["PUT"])
def update_student(student_id):
    data = request.get_json()
    update_data = {
        "name": data.get("name"),
        "age": data.get("age"),
        "course": data.get("course"),
        "grade": data.get("grade")
    }
    result = students_collection.update_one(
        {"_id": ObjectId(student_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        return jsonify({"error": "Student not found"}), 404
    updated_student = students_collection.find_one({"_id": ObjectId(student_id)})
    return jsonify(student_to_json(updated_student))

# Delete a student
@app.route("/api/students/<string:student_id>", methods=["DELETE"])
def delete_student(student_id):
    result = students_collection.delete_one({"_id": ObjectId(student_id)})
    if result.deleted_count == 1:
        return jsonify({"message": "Student deleted"})
    return jsonify({"error": "Student not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
