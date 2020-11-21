
import { usersCollection, postsCollection, commentsCollection, auth } from '../firebase';
import { Model } from '@vuex-orm/core'
import store from '@/store';
import { LocalAuth } from '@/plugins/LocalAuth';
import { Qurey } from './internal/Qurey';
import { ApiImage } from "./index";

import { api } from '@/api/types'
import { forIn, isError, isUndefined, keys } from 'lodash';

export default class Profile  extends Qurey {

  public table: firebase.firestore.DocumentData;
  public model: typeof Model;
  public _withThumb: boolean

  constructor(model: typeof Model) {
    super()

    this.table = usersCollection;
    this.model = model;
    this._withThumb = false;

  }







  withThumb() {
    this._withThumb = true;
    return this;
  }

  private async hasWithThumb(profile: any) {
    

    let p = profile;
    if (this._withThumb) {
      p.thumb = await this.getThumb(profile.id);
    }

    return p;

  }

  private async getThumb(id: string) {
    
    let hasAuth = this.logged().check();
    let hasThumb = this.logged().getThum()

    if (hasAuth && hasThumb) {

      if (hasThumb.modelId == id) {
        return Promise.resolve(hasThumb);
      }

    }

    return await (new ApiImage(this.model.entity)).show(id)

  }

  async collection(): Promise<Array<api.response.profile> | Error> {
    try {

      const snap = await this.table.get();
      console.log(snap);
      
      let data = snap.docs.map((item: any): profileInterface => {
        let id = item.id;
        let data = item.data();
        data.id = id;
        return data;
      })

      return data;

    } catch (error) {
      console.log(error);

      return error;

    }

  }

  async update(profile: api.request.profile, obj: profileInterface) {
    if (!profile.userId) {
      throw 'profile id are missig'
    }

    try {
      
    
    await usersCollection.doc(profile.userId).update(obj)
    const postDocs = await this.posts(profile.userId).get()
    postDocs.forEach(doc => {
      postsCollection.doc(doc.id).update({
        userName: profile.name
      })
    })

    // update all comments by user
    const commentDocs = await this.comments(profile.userId).get()
    commentDocs.forEach(doc => {
      commentsCollection.doc(doc.id).update({
        userName: profile.name
      })
    })

    const userProfile = await this.table.doc(profile.userId).get()

    return userProfile;
  } catch (error) {
      return error;
  }


  }

  async create(user: firebase.User, obj: api.request.profile): Promise<api.response.profile | Error> {

    try {
      await this.table.doc(user.uid).set(obj);

      const userProfile = await this.table.doc(user.uid).get()

      return userProfile;

    } catch (e) {
      return e;

    }

  }

 async hasLocalShow(userId: any) {
    let hasAuth = LocalAuth.check();
    let hasP = LocalAuth.profile();
    if (hasAuth && hasP) {
      return Promise.resolve(hasP);
      
    } else {
      return Promise.resolve(null);
    }

  }

  async show(userId: any): Promise<api.response.profile | null | Error> {

    try {

      let data: any = {}

      let ha = await this.hasLocalShow(userId);
      let profileId;

      if (ha) {
        data = ha;
        profileId = ha.id;

      } else {

        const userProfile = await usersCollection.doc(userId).get();

        forIn(userProfile.data(), (v, key: any | keyof api.response.profile) => {
          data[key] = v
        })
        profileId = userProfile.id;
      }

      if (
        keys(data).length) {
        data.id = profileId;
        let d: api.response.profile = data as api.response.profile;

        return await this.hasWithThumb(d);
      }

      return null;

    } catch (error) {
      return error;
    }

  }

  delete(id: any) {

  }

}