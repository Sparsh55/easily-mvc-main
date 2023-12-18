export default class ApplicantModel {
  constructor(id, name, email, phone, resume, cmpId) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.resume = resume;
    this.cmpId = cmpId;
  }

  static getApplicants() {
    return applicants;
  }

  static createApplication(name, email, phone, resume, cmpId) {
    var id = "APLY" + Date.now();

    const applicant = new ApplicantModel(id, name, email, phone, resume, cmpId);

    applicants.push(applicant);
  }

  static getApplicantsByCmpId(id) {
    const applicant = applicants.filter((a) => {
      return a.cmpId == id;
    });
    return applicant;
  }

  static getNoOfApplicantsByCmpId(id) {
    const applicant = applicants.filter((a) => {
      return a.cmpId == id;
    });
    return applicant.length;
  }
}

var applicants = [
  new ApplicantModel(
    "APLY0",
    "John Doe",
    "john@gmail.com",
    "+1234567890",
    "/resources/pdfs/resume.pdf",
    "1"
  ),
  new ApplicantModel(
    "APLY1",
    "Jane Smith",
    "jane@gmail.com",
    "+1234567545",
    "/resources/pdfs/resume.pdf",
    "1"
  ),
  new ApplicantModel(
    "APLY2",
    "Debasish Halder",
    "hdebasish@gmail.com",
    "+1234555890",
    "/resources/pdfs/resume.pdf",
    "2"
  ),
  new ApplicantModel(
    "APLY3",
    "Mark Twain",
    "ankit@gmail.com",
    "+12356567545",
    "/resources/pdfs/resume.pdf",
    "2"
  ),
  new ApplicantModel(
    "APLY4",
    "John Doe",
    "badde@gmail.com",
    "+12345021290",
    "/resources/pdfs/resume.pdf",
    "3"
  ),
  new ApplicantModel(
    "APLY5",
    "Elon Musk",
    "lobe@gmail.com",
    "+1234454545",
    "/resources/pdfs/resume.pdf",
    "4"
  ),
];
