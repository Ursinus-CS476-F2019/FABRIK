let vec3 = glMatrix.vec3

function FABRIKInner(Ps, ds, p, p0, forward) {
    let diff = vec3.create();
    if (forward) {
        vec3.copy(Ps[Ps.length-1], p);
        let i = Ps.length - 2;
        while (i >= 0) {
            vec3.subtract(diff, Ps[i], Ps[i+1]);
            vec3.normalize(diff, diff);
            vec3.scaleAndAdd(Ps[i], Ps[i+1], diff, ds[i]);
            i--;
        }
    }
    else {
        vec3.copy(Ps[0], p0);
        for (let i = 0; i < Ps.length-1; i++) {
            vec3.subtract(diff, Ps[i+1], Ps[i]);
            vec3.normalize(diff, diff);
            vec3.scaleAndAdd(Ps[i+1], Ps[i], diff, ds[i]);
        }
    }
}

/**
 * 
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