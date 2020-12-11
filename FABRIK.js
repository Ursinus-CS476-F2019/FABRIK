let vec3 = glMatrix.vec3

/**
 * Perform a single pass of FABRIK, either in the forward or backward direction
 * @param {list} Ps List of joints on the arm (update these by reference)
 * @param {list} ds Distance between adjacent joints on the arm
 * @param {vec3} p Target position
 * @param {vec3} p0 Original position of arm anchor
 * @param {boolean} forward If true, do a forward pass.  If false, do a backward pass
 */
function FABRIKInner(Ps, ds, p, p0, forward) {
    // TODO: Fill this in
}

/**
 * Perform a single forward/backward pass of FABRIK
 * @param {list} Ps List of joints on the arm
 * @param {vec3} p Target
 */
function FABRIKIter(Ps, p) {
    // Step 1: Compute all distances between adjacent joints
    let ds = [];
    let N = Ps.length;
    for (let i = 0; i < N-1; i++) {
        let diff = vec3.create();
        vec3.subtract(diff, Ps[i+1], Ps[i]);
        ds.push(vec3.length(diff));
    }
    // Step 2: Perform an iteration of FABRIK
    // Store original position of arm anchor
    let p0 = vec3.create();
    vec3.copy(p0, Ps[0]);
    FABRIKInner(Ps, ds, p, p0, true);
    FABRIKInner(Ps, ds, p, p0, false);
}