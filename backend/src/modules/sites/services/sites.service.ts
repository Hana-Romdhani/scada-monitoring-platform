import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Site, SiteDocument } from './site.schema';

@Injectable()
export class SitesService {
  constructor(@InjectModel(Site.name) private siteModel: Model<SiteDocument>) {}

  async create(createSiteDto: any): Promise<Site> {
    const createdSite = new this.siteModel(createSiteDto);
    return createdSite.save();
  }

  async findAll(): Promise<Site[]> {
    return this.siteModel.find().exec();
  }

  async findOne(id: string): Promise<Site> {
    return this.siteModel.findById(id).exec();
  }

  async update(id: string, updateSiteDto: any): Promise<Site> {
    return this.siteModel.findByIdAndUpdate(id, updateSiteDto, { new: true }).exec();
  }

  async remove(id: string): Promise<any> {
    return this.siteModel.findByIdAndDelete(id).exec();
  }
}
