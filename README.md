### Mono Repo Blockchain template

#### Pre-requisite: Node version

```
    node: v20.12.2
```

## Either git clone it or create a project

### Steps

#### 1. Create a New Directory for Your Project:

```
    $> mkdir my-project
    $> cd y-project
```

#### 2. Initialize a New Git Repository

```
    node: v20.12.2
```

#### 3. Initialize the Project with a package.json File:

```
    $> npm init -y
```

#### 4. Setup workspaces

```
    {
        "private": true,
        "workspaces": [
            "frontend",
            "blockchain",
            "backend"
        ]
    }
```

#### 5. Create Subdirectories for Each Part of the Project:

```
    $> mkdir frontend blockchain backend
    $> cd frontend
    $> npx create-react-app .


    $> cd ../blockchain
    # Setup blockchain - Hardhat setup
    $> npm init -y
    $> npm install --save-dev hardhat
    $> npx hardhat init


    $> cd ../backend
    # Setup backend - Express.js project
    $> npm init -y
    $> npm install express
```

#### 6. Add Scripts in the 'package.json'

```
    "scripts": {
        "start:frontend": "npm workspace frontend start",
        "start:blockchain": "npm workspace blockchain truffle compile",
        "start:backend": "npm workspace backend node index.js",
        "build": "npm workspaces run build"
    }

```
