import multiprocessing
import subprocess
import os
import time

def run_app(script_path):
    print(f"Running: {script_path}")
    # Start each app without blocking the process
    subprocess.Popen(['python', script_path])

if __name__ == "__main__":
    # Ensure the working directory is correct
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    apps = [
        {"name": "Symptom App", "script": "symptom_app.py"},
        {"name": "Flask App (Image)", "script": "flask_app.py"},
    ]

    processes = []
    for app in apps:
        script_path = os.path.abspath(app["script"])
        print(f"Starting process for {app['name']} at {script_path}")
        p = multiprocessing.Process(target=run_app, args=(script_path,))
        p.start()
        processes.append(p)

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down all apps...")
        for p in processes:
            p.terminate()
        for p in processes:
            p.join()
        print("All processes terminated.")
