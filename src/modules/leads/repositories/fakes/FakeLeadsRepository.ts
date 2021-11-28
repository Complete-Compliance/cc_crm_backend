import { uuid } from 'uuidv4';

import ILeadsRepository from '@modules/leads/repositories/ILeadsRepository';
import ICreateLeadDTO from '@modules/leads/dtos/ICreateLeadDTO';

import Lead from '@modules/leads/infra/typeorm/entities/Lead';

export default class FakeLeadsRepository implements ILeadsRepository {
  private leads: Lead[] = [];

  public async findById(id: string): Promise<Lead | undefined> {
    const foundLead = this.leads.find(lead => lead.id === id);

    return foundLead;
  }

  public async findByDOT(dot: string): Promise<Lead | undefined> {
    const foundLead = this.leads.find(lead => lead.usdot === dot);

    return foundLead;
  }

  public async findByContainingStringDOT(
    searchString: string,
    _skip: number,
  ): Promise<Lead[]> {
    const foundLeads = this.leads.filter(
      lead => lead.usdot.indexOf(searchString) >= 0,
    );

    return foundLeads;
  }

  public async countByContainingStringDOT(
    searchString: string,
  ): Promise<number> {
    const foundLeads = this.leads.filter(
      lead => lead.usdot.indexOf(searchString) >= 0,
    );

    return foundLeads.length;
  }

  public async findAll(_skip: number): Promise<Lead[]> {
    return this.leads;
  }

  public async findAllWithEmail(
    _skip: number,
    _emailType: string,
  ): Promise<Lead[]> {
    return this.leads.filter(lead => lead.email && lead.email !== 'N/A');
  }

  public async create(leadData: ICreateLeadDTO): Promise<Lead> {
    const lead = new Lead();

    Object.assign(lead, { id: uuid() }, leadData);

    this.leads.push(lead);

    return lead;
  }

  public async save(lead: Lead): Promise<Lead> {
    const findIndex = this.leads.findIndex(
      leadToFind => leadToFind.id === lead.id,
    );

    this.leads[findIndex] = lead;

    return lead;
  }

  public async delete(lead: Lead): Promise<void> {
    const findIndex = this.leads.findIndex(
      leadToFind => leadToFind.id === lead.id,
    );

    this.leads.splice(findIndex, 1);
  }

  public async findHighestDOT(): Promise<number | undefined> {
    const highestDOT = this.leads.reduce((highest, currentLead) => {
      if (Number(highest.usdot) < Number(currentLead.usdot)) {
        return currentLead;
      }
      return highest;
    }, this.leads[0]);

    return Number(highestDOT.usdot);
  }

  public async countLeads(): Promise<number> {
    return this.leads.length;
  }
}
