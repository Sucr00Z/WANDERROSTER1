import { LightningElement, api, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import generatePDF from "@salesforce/apex/PDFGenerator.generatePDF";

import { NavigationMixin } from "lightning/navigation";
import Logo from "@salesforce/resourceUrl/Logo";
import Logo1 from "@salesforce/resourceUrl/Logo1";
import Medical from "@salesforce/resourceUrl/Medical";
import Business1 from "@salesforce/resourceUrl/Business1";
import Vacation from "@salesforce/resourceUrl/Vacation";
import SouparnoDey from "@salesforce/resourceUrl/SouparnoDey";
import SubhrojyotiPanja from "@salesforce/resourceUrl/SubhrojyotiPanja";
import SayanDuttaRoy from "@salesforce/resourceUrl/SayanDuttaRoy";
import SubhadipDey from "@salesforce/resourceUrl/SubhadipDey";
import RanajitBiswas from "@salesforce/resourceUrl/RanajitBiswas";
import Bus from "@salesforce/resourceUrl/Bus";
import Food from "@salesforce/resourceUrl/Food";
import Train from "@salesforce/resourceUrl/Train";
import Cab from "@salesforce/resourceUrl/Cab";
import Flight from "@salesforce/resourceUrl/Flight";
import Background1 from "@salesforce/resourceUrl/Background1";

export default class experienceWanderRoster extends NavigationMixin(LightningElement) {
  
  @api AlphaURL = Logo;
  @api WanderRosterURL = Logo1;
  @api FoodURL = Food;
  @api CabURL = Cab;
  @api TrainURL = Train;
  @api BusURL = Bus;
  @api FlightURL = Flight;
  @api BackgroundOneURL = Background1;
  @api RanajitURL = RanajitBiswas;
  @api SubhadeepURL = SubhadipDey;
  @api SouparnaURL = SouparnoDey;
  @api SubhrojyotiURL = SubhrojyotiPanja;
  @api SDRURL = SayanDuttaRoy;
  @api sectionId;

  get getBackgroundImage() {
    return `background-image:url("${this.BackgroundOneURL}")`;
  }

  get options() {
    return [
      { label: "Book Flight", value: "BookFlight" },
      { label: "Book Cab", value: "BookCab" },
      { label: "Book Train", value: "BookTrain" },
      { label: "Book Bus", value: "BookBus" },
      { label: "Order Food", value: "OrderFood" },
    ];
  }
  handleSelect(event) {
    this.value = event.detail.value;
  }

  carouselData = [
    {
      src: Medical,
      header: "Medical",
      alternativeText: "Medical Travel.",
      //href: 'javascript:void(0);'
    },
    {
      src: Business1,
      header: "Business",
      alternativeText: "Buisness Travel.",
      //href: 'javascript:void(0);'
    },
    {
      src: Vacation,
      header: "Vacation",
      alternativeText: "Vacation",
      //href: 'javascript:void(0);'
    },
  ];

  //Travel Approval Request Form
  @track showAdditionalField = false;
  travelApprovalNumber;
  travelType;
  empName;
  department;
  purpose;
  startDate;
  endDate;
  destinationState;
  stateCode;
  allowancePerDay;
  transportationCost;

  handleSuccess(event) {
    this.travelApprovalNumber = event.detail.name;
    this.travelType = event.detail.Travel_Type__c;
    this.empName = event.detail.Employee_Name__c;
    this.department = event.detail.Department__c;
    this.purpose = event.detail.Purpose__c;
    this.startDate = event.detail.Start_Date__c;
    this.endDate = event.detail.End_Date__c;
    this.destinationState = event.detail.Destination_State__c;
    this.stateCode = event.detail.State_Code__c;
    this.allowancePerDay = event.detail.Budget_Amount__c;
    this.transportationCost = event.detail.Transportation_Cost__c;
  }

  handleSuccessToast() {
    const event = new ShowToastEvent({
      title: "Succesfull!",
      message: "Your travel approval request has been submitted.",
      variant: "success"
    });
    this.dispatchEvent(event);
    setTimeout(() => {
        location.reload();
    }, 2000);
  }

  handleErrorToast() {
    const event = new ShowToastEvent({
      title: "Unsuccesfull!",
      message: "Your travel approval request has not been submitted.",
      variant: "error"
    });
    this.dispatchEvent(event);
  }

  handleReset(event) {
    const inputFields = this.template.querySelectorAll("lightning-input-field");
    if (inputFields) {
      inputFields.forEach((field) => {
        //field.reset();
        field.value = null;
      });
    }
  }

  //PDF Generation

  handleInputChangePurpose(event) {
    this.purpose = event.target.value;
  }
  handleInputChangetravelType(event) {
    this.travelType = event.target.value;
  }
  handleInputChangeempName(event) {
    this.empName = event.target.value;
  }
  handleInputChangedepartment(event) {
    this.department = event.target.value;
  }
  handleInputChangestartDate(event) {
    this.startDate = event.target.value;
  }
  handleInputChangeendDate(event) {
    this.endDate = event.target.value;
  }
  // handleInputChangedestinationState(event) {
  // this.destinationState = event.target.value;

  // }
  handleInputChangestateCode(event) {
    this.stateCode = event.target.value;
  }
  handleInputChangeallowancePerDay(event) {
    this.allowancePerDay = event.target.value;
  }
  handleInputChangetransportationCost(event) {
    this.transportationCost = event.target.value;
  }

  handleChange(event) {
    if (event.target.value != null) this.showAdditionalField = true;
    else this.showAdditionalField = false;
  }
  generatePDF() {
    generatePDF({
      travelType: this.travelType,
      empName: this.empName,
      department: this.department,
      purpose: this.purpose,
      startDate: this.startDate,
      endDate: this.endDate,
      //destinationState: this.destinationState,
      stateCode: this.stateCode,
      allowancePerDay: this.allowancePerDay,
      transportationCost: this.transportationCost,
    })
      .then((result) => {
        // Handle success
        console.log("PDF Generated Successfully");
        // Open the PDF in a new tab
        this.openPDFInNewTab(result);
      })
      .catch((error) => {
        // Handle error
        console.error("Error generating PDF: ", error);
      });
  }

  openPDFInNewTab(pdfData) {
    // Convert the returned PDF data to a blob
    const byteCharacters = atob(pdfData);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Create a blob URL for the PDF
    const blobUrl = URL.createObjectURL(blob);

    // Open the PDF in a new tab
    window.open(blobUrl, "_blank");
  }

isChildComponentVisible = false;
    navigateToChild() {
        this[NavigationMixin.Navigate]({
            type: 'standard__component',
            attributes: {
                componentName: 'c__CaseComponent' // Replace 'ChildComponent' with your actual child component name
            }
        });
        this.isChildComponentVisible = true;
    }
}