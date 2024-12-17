"""
Example policy to read in. 
"""

import numpy as np


class UserPolicy:
    def __init__(self, num_actions):
        # Initialize a number of actions
        self.num_actions = num_actions

    def act(
        self, observation=None, reward=None, terminated=None, truncated=None, info=None
    ):
        # Dummy logic: random action
        return np.random.choice(self.num_actions)
