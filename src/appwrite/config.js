import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteurl)
      .setProject(conf.appwriteprojectid);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("app write service:: create post ::error", error);
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.this.updateDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug,
        {
          title,
          status,
          featuredImage,
          content,
        }
      );
    } catch (error) {
      console.log("app write service:: update post ::error", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug
      );
      return true;
    } catch (error) {
      console.log("app write service:: delete post ::error", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        slug
      );
    } catch (error) {
      console.log("app write service:: get post ::error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwritedatabaseid,
        conf.appwritecollectionid,
        queries
      );
    } catch (error) {
      console.log("app write service:: get posts ::error", error);
      return false;
    }
  }

  //   file upload service
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwritebucketid,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("app write service:: uplode file ::error", error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwritebucketid, fileId);
      return true;
    } catch (error) {
      console.log("app write service:: delete file ::error", error);
      return false;
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
        conf.appwritebucketid,
        fileId
    )

  }
}

const service = new Service();

export default service;
