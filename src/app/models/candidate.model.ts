import { TalentAdvocate } from './talent-advocate.model';

export class Candidate {
    public idCandidate: number;
    public firstName: string;
    public lastName: string;
    public email: string;
    public birthDate: string;
    public talentAdvocate: TalentAdvocate;
}