import tempfile
import os
from datetime import datetime
from fastapi import FastAPI, UploadFile, File, Form
from typing import Annotated

app = FastAPI()


async def save_uploaded_file_to_policies_folder(file):
    # Define the directory where the file should be saved
    current_dir = os.path.dirname(
        os.path.abspath(__file__)
    )  # Get the current script directory
    policies_dir = os.path.join(current_dir, "policies")

    # Create the 'policies' folder if it doesn't exist
    os.makedirs(policies_dir, exist_ok=True)

    # Get the current timestamp as a string
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

    # Construct a unique file name with the timestamp and original extension
    _, file_extension = os.path.splitext(file.filename)
    unique_filename = f"policy_{timestamp}{file_extension}"
    file_path = os.path.join(policies_dir, unique_filename)

    # Save the file content to the 'policies' folder
    with open(file_path, "wb") as policy_file:  # Use "wb" for binary data
        content = (
            await file.read()
        )  # Read file content (async for frameworks like FastAPI)
        policy_file.write(content)

    return file_path


@app.post("/visualize")
async def visualize_file(
    file: Annotated[UploadFile, File()],
):
    # Print file information
    print(f"Received file: {file.filename}")
    print(f"Content type: {file.content_type}")

    # Read file content if needed
    temp_path = await save_uploaded_file_to_policies_folder(file)

    # Return a simple response
    return {"message": "File received successfully", "filename": file.filename}
