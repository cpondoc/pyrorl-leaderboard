"""
Sample runner policy.
"""

import os
import numpy as np
from PIL import Image, ImageSequence
import pyrorl
import importlib.util
import gymnasium


def load_policy(policy_path, num_actions):
    """
    Dynamically load the user policy from a given file path.
    """
    spec = importlib.util.spec_from_file_location("user_policy", policy_path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.UserPolicy(num_actions)


def evaluate_policy(policy, env, episodes=10):
    """
    Runs the policy in the environment and collects scores.
    """
    # Run for 10 iterations
    scores = []
    for ep in range(episodes):

        # Reset environment
        os.makedirs("grid_screenshots", exist_ok=True)
        observation, _ = env.reset()
        done = False
        total_reward = 0

        # Iterate until all are done
        while not done:
            action = policy.act(observation)
            observation, reward, done, _, _ = env.step(action)

            # Render, add reward achieved
            env.render()
            total_reward += reward

        # Calculate GIF, set up directories
        env.unwrapped.generate_gif()
        output_dir = "tmp/"
        output_gif = os.path.join(output_dir, f"eval-{ep}.gif")

        # Save to updated location
        with Image.open("training.gif") as gif:
            frames = [frame.copy() for frame in ImageSequence.Iterator(gif)]
            frames[0].save(
                output_gif,
                save_all=True,
                append_images=frames[1:],
                loop=0,  # 0 for infinite loop
                duration=gif.info["duration"],  # Use the original frame duration
            )

        # Append and return total score
        scores.append(total_reward)
        os.remove("training.gif")
    return scores


def initialize_environment():
    """
    Initialize PyroRL environment.
    """
    # Set up parameters
    num_rows, num_cols = 10, 10
    populated_areas = np.array([[1, 2], [4, 8], [6, 4], [8, 7]])
    paths = np.array(
        [
            [[1, 0], [1, 1]],
            [[2, 2], [3, 2], [4, 2], [4, 1], [4, 0]],
            [[2, 9], [2, 8], [3, 8]],
            [[5, 8], [6, 8], [6, 9]],
            [[7, 7], [6, 7], [6, 8], [6, 9]],
            [[8, 6], [8, 5], [9, 5]],
            [[8, 5], [9, 5], [7, 5], [7, 4]],
        ],
        dtype=object,
    )
    paths_to_pops = {
        0: [[1, 2]],
        1: [[1, 2]],
        2: [[4, 8]],
        3: [[4, 8]],
        4: [[8, 7]],
        5: [[8, 7]],
        6: [[6, 4]],
    }

    # Create environment
    kwargs = {
        "num_rows": num_rows,
        "num_cols": num_cols,
        "populated_areas": populated_areas,
        "paths": paths,
        "paths_to_pops": paths_to_pops,
        "skip": True,
    }
    env = gymnasium.make("pyrorl/PyroRL-v0", **kwargs)
    return env


def main(policy_path):
    """
    Set up environment and policy, evaluate, and print to screen.
    """
    # Set up environment, get number of actions
    env = initialize_environment()
    num_actions = env.action_space.n

    # Set up the policy.
    policy = load_policy(policy_path, num_actions)

    # Evaluate, and learn policy over scores.
    scores = evaluate_policy(policy, env)
    print(f"Policy scores over {len(scores)} episodes: {scores}")


if __name__ == "__main__":
    """
    Run with an example of a policy.
    """
    # Path to the user's policy file
    main("policy.py")
