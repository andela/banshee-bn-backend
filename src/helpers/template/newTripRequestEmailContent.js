/**
 *
 * @param {object} data
 * @returns {string} string
 */
const newTripRequestEmailTemplate = (data) => {
    const requesterName = `${data.user.firstName} ${data.user.lastName}`;
    const requesterEmail = `${data.user.email}`;
    const requeterStartLocation = `${data.startLocation.name} ${data.startLocation.location.city} ${data.startLocation.location.country}`;
    const departureDate = `${data.trips.departureDate}`;
    const reason = `${data.trips.reason}`;
    const type = `${data.trips.type}`;
    const destinations = data.destinations.reduce((initial, destination) => `
            ${initial}<tr>
            <td>${destination.branch.name} ${destination.branch.location.city} ${destination.branch.location.country}</td>
            <td>${destination.accomodation.name}</td>
            <td>Indefinite</td>
        </tr>`, '');
    return `
    <div class="container">
    <div class="logo">
        <center><img src="https://res.cloudinary.com/pomile/image/upload/c_scale,w_120/v1567691280/nomadTravel_lg_logo_sqbl9o.png" /></center>
    </div>
    <h2 class="title">New Trip Request</h2>
    <div class="row">
      <div class="half-row float-left hide-on-medium-large-up">
            <div class="dataclip-header-2">
                Trip</div>
            <div class="dataclip-body-2 text-format">
                <div><span>${type}</span></div>
                <div class="text-format">Departure: <span>${departureDate}</span></div>
            </div>
        </div>
        <div class="half-row float-left">
            <div class="dataclip-header">
                Requester</div>
            <div class="dataclip-body text-format">
                <h3 style="margin: 2px" class="text-format">${requesterName}</h3>
                <email class="text-format">${requesterEmail}</email>
            </div>
        </div>
        <div class="half-row float-left hide-on-small-only">
            <div class="dataclip-header-2">
                Trip</div>
            <div class="dataclip-body-2 text-format">
                <div><span>${type}</span></div>
                <div class="text-format">Departure: <span>${departureDate}</span></div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="half-row">
            <div class="dataclip-header text-format">
                Start Location</div>
            <div class="dataclip-body text-format">
                <div>${requeterStartLocation}</div>
            </div>
        </div>
    </div>
    <div style="overflow-x:auto;">
        <table class="data-table">
            <tr>
                <th class="table-header">Destinations</th>
        
                <th class="table-header">Accommodations</th>
                <th class="table-header">Duration</th>
            </tr>
            ${destinations}
        </table>
    </div>
    
    <div class="top-margin-small-xx">
        <div class="dataclip-header-3">Reasons</div>
        <p class="reason">
            ${reason}
        </p>
    </div>
  </div>
    `;
};

export default newTripRequestEmailTemplate;
