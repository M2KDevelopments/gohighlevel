export interface ILocation{
    id: string,
      name: string,
      address: string,
      city: string,
      country: string,
      state: string,
      postalCode: string,
      website: string,
      timezone: string,
      firstName: string,
      lastName: string,
      email: string,
      phone: string,
      business: {
        name: string,
        address: string,
        city: string,
        country: string,
        state: string,
        postalCode: string,
        website: string,
        timezone: string
      },
      social: {
        facebookUrl: string,
        googlePlus: string,
        linkedIn: string,
        foursquare: string,
        twitter: string,
        yelp: string,
        instagram: string,
        youtube: string,
        pinterest: string,
        blogRss: string,
        googlePlaceId: string
      },
      settings: {
        allowDuplicateContact: boolean,
        allowDuplicateOpportunity: boolean,
        allowFacebookNameMerge: boolean,
        disableContactTimezone: boolean
      }
}