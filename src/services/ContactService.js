import HttpClient from './utils/HttpClient';
import ContactMapper from './mappers/ContactMapper';

class ContactService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listContacts(orderBy = 'asc') {
    const contacts = await this.httpClient.get(`/contacts?orderBy=${orderBy}`);

    return contacts.map(ContactMapper.toDomain);
  }

  async getContactById(id) {
    const contact = await this.httpClient.get(`/contacts/${id}`);

    return ContactMapper.toDomain(contact);
  }

  async createContact(contact) {
    const body = ContactMapper.toPersistence(contact);
    const createdContact = await this.httpClient.post('/contacts', { body });

    return ContactMapper.toDomain(createdContact);
  }

  async updateContact(id, contact) {
    const body = ContactMapper.toPersistence(contact);
    const updatedContact = await this.httpClient.put(`/contacts/${id}`, { body });

    return ContactMapper.toDomain(updatedContact);
  }

  deleteContact(id) {
    return this.httpClient.delete(`/contacts/${id}`);
  }
}

export default new ContactService();
