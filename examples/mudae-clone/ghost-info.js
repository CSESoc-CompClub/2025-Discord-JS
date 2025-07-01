// this array holds a list of objects that look like
/*
    {
        ID: the user ID
        ghosts: [] an array of all the ghosts the user has
    }
*/
export const userClaims = [];

// given a ghost, adds the ghost to a list of the user's
// collected ghosts. Should return true if it succeeds and
// false if someone else already owns that ghost
export function claimGhost(userId, ghost) {
    if (getGhostOwnerID(ghost.name) === "") {
        const user = userClaims.find(u => u.ID === userId);
        if (user === undefined) {
            userClaims.push({ID: userId, ghosts: [ghost]});
        } else {
            user.ghosts.push(ghost);
        }
        return true;
    }
    return false;
}

// should return an array of all the ghosts a user owns,
// or [] if they don't own any
export function getUserCollection(userId) {
    const user = userClaims.find(u => u.ID === userId);
    if (user === undefined) {
        return [];
    } else {
        return user.ghosts;
    }
}

// returns the user ID of the ghost's owner, and if the
// ghost is unclaimed then just returns ""
export function getGhostOwnerID(ghostName) {
    for (let user of userClaims) {
        if (user.ghosts.some(g => g.name.toLowerCase() === ghostName.toLowerCase())) {
            return user.ID;
        }
    }
    return "";
}