# PyroRL Leaderboard

A way to upload a file and evaluate your policy against random configurations of our RL enrivonment.

## Set-Up

### Backend

First, set up the environment:

```bash
cd backend
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

## To Run

First, make sure you have a `policy.py` file in the top directory. Then, after following set-up instructions, run:

```bash
python3 runner.py
```