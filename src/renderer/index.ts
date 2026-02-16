// Core NBTA domain types

export type Classification = 'AAAA' | 'AAA' | 'AA' | 'A' | 'B' | 'C';

export type AgeDivision = 'Tot' | 'Juvenile' | 'Pre-teen' | 'Junior' | 'Senior';

export type StatusLevel = 'Novice' | 'Beginner' | 'Intermediate' | 'Advanced' | 'College';

export type EventType = 
  | 'Solo Baton'
  | 'X-Strut'
  | '2-Baton'
  | '3-Baton'
  | 'Flag'
  | 'Model'
  | 'Basic Strut'
  | 'Duet'
  | 'Trio'
  | 'Team';

export interface Participant {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  gender?: string;
  citizenship: string;
  coachId?: number;
  studio?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coach {
  id: number;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  studio?: string;
  isJudge: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Contest {
  id: number;
  name: string;
  date: string;
  location?: string;
  classification: Classification;
  numLanes: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Judge {
  id: number;
  contestId: number;
  coachId?: number;
  firstName: string;
  lastName: string;
  email?: string;
}

export interface Event {
  id: number;
  contestId: number;
  eventType: EventType;
  statusLevel: StatusLevel;
  ageDivision: AgeDivision;
  ageMin: number;
  ageMax: number;
  timeMinSeconds?: number;
  timeMaxSeconds?: number;
  performanceAreaSize?: string;
  createdAt: string;
}

export interface ParticipantStatus {
  id: number;
  participantId: number;
  eventType: EventType;
  statusLevel: StatusLevel;
  wins: number;
}

export interface Registration {
  id: number;
  eventId: number;
  participantId: number;
  registrationDate: string;
}

export interface Score {
  id: number;
  eventId: number;
  participantId: number;
  judgeId: number;
  rawScore: number;
  penaltyDrops: number;
  penaltyTwoHand: number;
  penaltyFalls: number;
  penaltyBreaks: number;
  penaltyTimeSeconds: number;
  penaltyNoSalute: number;
  penaltyImproperSalute: number;
  totalPenalties: number;  // Generated column
  finalScore: number;       // Generated column
  placementForThisJudge?: number;
  flagged: boolean;
  notes?: string;
  createdAt: string;
}

export interface Result {
  id: number;
  eventId: number;
  participantId: number;
  placementPointsSum: number;
  rawScoreSum: number;
  finalPlacement: number;
  qualifiedForNationals: boolean;
  isAdvancement: boolean;
  createdAt: string;
}

// Set System types

export interface Division {
  eventType: EventType;
  statusLevel: StatusLevel;
  ageDivision: AgeDivision;
  contestants: Participant[];
  estimatedTimeMinutes: number;
}

export interface LaneAssignment {
  laneNumber: number;
  judge: Judge;
  divisions: Division[];
  totalTimeMinutes: number;
}

export interface SetSystemPosition {
  positionNumber: number;
  lane1Content: Participant | DivisionHeader | null;
  lane2Content: Participant | DivisionHeader | null;
  lane3Content: Participant | DivisionHeader | null;
  lane4Content: Participant | DivisionHeader | null;
  isLunchBreak: boolean;
}

export interface DivisionHeader {
  divisionName: string;
  hasConflict: boolean;  // Marked with **
}

export interface Conflict {
  type: 'coach_student' | 'rest_time' | 'double_entry';
  severity: 'critical' | 'warning';
  division?: Division;
  participant?: Participant;
  judge?: Judge;
  message: string;
  suggestedResolution?: string;
}
