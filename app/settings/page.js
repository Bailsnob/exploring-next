export default function SettingsPage() {
  return (
    <div className="container-fluid" id="fullscreen-containre">
      <div className="row">
        <div className="col-6">
          <label for="state-restriction" class="form-label">
            States:
          </label>
          <select
            class="form-select menu-input"
            name="state-restriction"
            id="state-restriction"
            data-bs-toggle="tooltip"
            title="What states do you want to use?"
            multiple=""
          >
            <option value="Alabama">Alabama</option>
            <option value="Alaska">Alaska</option>
            <option value="Arizona">Arizona</option>
            <option value="Arkansas">Arkansas</option>
            <option value="California">California</option>
            <option value="Colorado">Colorado</option>
            <option value="Connecticut">Connecticut</option>
            <option value="Delaware">Delaware</option>
            <option value="District Of Columbia">District Of Columbia</option>
            <option value="Florida">Florida</option>
            <option value="Georgia">Georgia</option>
            <option value="Hawaii">Hawaii</option>
            <option value="Idaho">Idaho</option>
            <option value="Illinois">Illinois</option>
            <option value="Indiana">Indiana</option>
            <option value="Iowa">Iowa</option>
            <option value="Kansas">Kansas</option>
            <option value="Kentucky">Kentucky</option>
            <option value="Louisiana">Louisiana</option>
            <option value="Maine">Maine</option>
            <option value="Maryland">Maryland</option>
            <option value="Massachusetts">Massachusetts</option>
            <option value="Michigan">Michigan</option>
            <option value="Minnesota">Minnesota</option>
            <option value="Mississippi">Mississippi</option>
            <option value="Missouri">Missouri</option>
            <option value="Montana">Montana</option>
            <option value="Nebraska">Nebraska</option>
            <option value="Nevada">Nevada</option>
            <option value="New Hampshire">New Hampshire</option>
            <option value="New Jersey">New Jersey</option>
            <option value="New Mexico">New Mexico</option>
            <option value="New York">New York</option>
            <option value="North Carolina">North Carolina</option>
            <option value="North Dakota">North Dakota</option>
            <option value="Ohio">Ohio</option>
            <option value="Oklahoma">Oklahoma</option>
            <option value="Oregon">Oregon</option>
            <option value="Pennsylvania">Pennsylvania</option>
            <option value="Rhode Island">Rhode Island</option>
            <option value="South Carolina">South Carolina</option>
            <option value="South Dakota">South Dakota</option>
            <option value="Tennessee">Tennessee</option>
            <option value="Texas">Texas</option>
            <option value="Utah">Utah</option>
            <option value="Vermont">Vermont</option>
            <option value="Virginia">Virginia</option>
            <option value="Washington">Washington</option>
            <option value="West Virginia">West Virginia</option>
            <option value="Wisconsin">Wisconsin</option>
            <option value="Wyoming">Wyoming</option>
          </select>
        </div>
        <div className="col-6">
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-light"
              data-bs-toggle="tooltip"
              title="Light Mode"
            >
              ↑
            </button>
            <button
              type="button"
              class="btn btn-dark"
              data-bs-toggle="tooltip"
              title="Dark Mode"
            >
              ↓
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <label for="date-minimum" class="form-label">
            Min Date:
          </label>
          <br />
          <div class="form-floating">
            <input
              type="number"
              class="menu-input"
              name="date-minimum"
              id="date-minimum"
              min="1900"
              max="2022"
              step="1"
              placeholder="Date"
              data-bs-toggle="tooltip"
              title="When is the lowest date you want to use?"
            />
          </div>
          <label for="date-maximum" class="form-label">
            Max Date:
          </label>
          <br />
          <div class="form-floating">
            <input
              type="number"
              class="menu-input"
              name="date-maximum"
              id="date-maximum"
              min="1900"
              max="2022"
              step="1"
              placeholder="Date"
              data-bs-toggle="tooltip"
              title="When is the highest date you want to use?"
            />
          </div>
        </div>
        <div className="col-6"></div>
      </div>
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6"></div>
      </div>
      <div className="row">
        <div className="col-6"></div>
        <div className="col-6"></div>
      </div>
    </div>
  );
}
