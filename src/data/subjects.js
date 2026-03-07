// ─── SUBJECT INDEX ──────────────────────────────────────────────────────────
// Central export for all subject roadmaps and metadata
import { ROADMAP_MATH, MATH_META } from './roadmap_math';
import { ROADMAP_PHYSICS, PHYSICS_META } from './roadmap_physics';
import { ROADMAP_BIOLOGY, BIOLOGY_META } from './roadmap_biology';
import { ROADMAP_SOCIAL, SOCIAL_META } from './roadmap_social';

export const SUBJECTS = {
    math: { roadmap: ROADMAP_MATH, meta: MATH_META },
    physics: { roadmap: ROADMAP_PHYSICS, meta: PHYSICS_META },
    biology: { roadmap: ROADMAP_BIOLOGY, meta: BIOLOGY_META },
    social: { roadmap: ROADMAP_SOCIAL, meta: SOCIAL_META },
};

export const SUBJECT_LIST = Object.values(SUBJECTS).map(s => s.meta);

export function getRoadmap(subjectId) {
    return SUBJECTS[subjectId]?.roadmap || ROADMAP_MATH;
}

export function getMeta(subjectId) {
    return SUBJECTS[subjectId]?.meta || MATH_META;
}

export function getDaysLeft(subjectId) {
    const meta = getMeta(subjectId);
    return Math.max(0, Math.ceil((new Date(meta.examDate) - new Date()) / (1000 * 60 * 60 * 24)));
}
