<template>
    <div id="meeting">
        <div id="absol">
            <div id="absol_date">
                <div id="target"></div>
                <span>{{ meetingData.month }}</span>
                <span>{{ meetingData.day }}</span>
            </div>
            <div id="absol_loc">
                <span>{{ meetingData.city }}</span>
                <span id="loc_address">{{ meetingData.address }}</span>
            </div>
        </div>
        <div id="top">
            <iframe id="map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50951.38718954761!2d-93.33008294252274!3d37.04647936034305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87cf6eed13ac8447%3A0xacf1a5ed53154eb7!2sNixa%2C%20MO%2065714!5e0!3m2!1sen!2sus!4v1673766963955!5m2!1sen!2sus"
                width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
        <div id="bottom">
            <div id="bottom_title">
                Join Us For The Next Meeting
            </div>
            <div id="buttom_btn_parent">
                <a :href="meetingData.link">
                    <button id="buttom_btn">View Livestream</button>
                </a>
            </div>
        </div>
        <div id="topics">
            <div id="calendarContainer">
                <div id="calendarTitle" @click="changeViewMode($event)">{{ currentMonth }} {{ currentYear }}</div>
                <div id="calendarMonth">
                    <span :key="lineNumber" v-for="(line, lineNumber) of currentDesc.split('<br>')">{{ line }}
                </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'MeetingPage',
    props: {

    },
    methods: {
        scrollToTop() { document.body.scrollTop = 0; },
        getMeeting(VueObj) {
            // const URL = `https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/meeting?year=${this.currentYear}&month=${this.currentMonth.slice(0, 3)}`;
            // const URL = `https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/meeting`;
            const URL = `https://us-east-1.aws.data.mongodb-api.com/app/app-0-yyrfg/endpoint/meetings/all`;
            axios.get(URL)
                .then(function (response) {
                    // handle success
                    if (!response.data) {
                        VueObj.meetingData = {};
                        return;
                    }
                    VueObj.yearsData = response.data[response.data.length-1].year;
                    VueObj.monthsData = response.data[response.data.length-1].months;
                    VueObj.currentMonth = VueObj.monthsData[VueObj.monthsData.length-1].month;
                    VueObj.currentYear = VueObj.yearsData;
                    VueObj.currentDesc = VueObj.monthsData[VueObj.monthsData.length-1].desc;
                    let indx = response.data[response.data.length-1].months.length - 1;
                    VueObj.meetingData = VueObj.monthsData[indx];
                    // console.log(VueObj.meetingData)
                    VueObj.mongoData = response.data;
                    // VueObj.years = response.data.length;
                    // // VueObj.yearsData = response.data[response.data.length-1].year;

                    VueObj.currentDecade = `${response.data[0].year} - ${response.data[response.data.length-1].year}`;
                })
                .catch(function (error) {
                    // handle error
                    VueObj.meetingData = {};
                    error;
                })
                .finally(function () {
                    // always executed
                });
        },
        spawnBlocks(type) {
            let nameID = 'calendarBlockM';
            if(type=="month"||type=="Month")
            {
                nameID = 'calendarBlockM';
            }else{
                nameID = 'calendarBlockY';
            }
            let year;
            for(let i = 0; i < this.mongoData.length; i++)
            {if(this.mongoData[i].year == this.currentYear){year = i;}}
            this.monthsData = this.mongoData[year].months;
            let VueObj = this;
            let parent = document.getElementById('calendarContainer');
            let blockParent = document.createElement('div');
            blockParent.id = "calendarMonthContainer";
            parent.appendChild(blockParent);

            for(let i = this.monthsData.length; i < 12; i++)
            {
                let obj = {
                    month: 'N/A',
                    desc: 'false',
                    day: ''
                }
                this.monthsData.push(obj);
            }
            document.getElementById('calendarTitle').innerHTML = this.currentYear;
            let newArr = [];
            //create array that has months for that year ['Jan','','']
            for(let i = 0; i < 12; i++)
            {
                if(this.monthArr.includes(this.monthsData[i].month))
                {
                    // newArr[this.monthArr.indexOf(this.monthsData[i].month)] = {day: this.monthsData[i].day, month: this.monthsData[i].month}
                    
                    newArr.push({day: this.monthsData[i].day, month: this.monthsData[i].month})
                }
                else{
                    newArr.push({day: '', month: ""})
                }
            }
            //organizing the months to the correct index [Dec = 11]
            for(let i = 0; i < 12; i++)
            {
                if(this.monthArr.includes(newArr[i].month))
                {
                    let newIndex = this.monthArr.indexOf(newArr[i].month)
                    // newArr[i] = {day: '', month: ""};
                    newArr[i] = {day: newArr[i].day, month: ""};
                    newArr[newIndex] = {day: newArr[i].day, month: this.monthArr[newIndex]};
                    //deleting the previous incorrect position
                }
            }
            //spawn blocks based on months in new array
            for(let i = 0; i < 12; i++)
            {
                let spanDay = document.createElement('div');
                if(this.monthArr.includes(newArr[i].month))
                {                    
                    //active
                    spanDay.id = nameID;
                    spanDay.innerHTML = this.monthArr[i]+`<span id='day'>${newArr[i].day}</span>`;
                    this.activeDay = newArr[i].day
                    spanDay.addEventListener('click', function () {
                        VueObj.changeTitle("month", this, newArr[i].month);
                    })
                }
                else{
                    //inactive
                    spanDay.id = "calendarBlock2";
                    spanDay.innerHTML = this.monthArr[i];
                }
                blockParent.appendChild(spanDay);
            }
        },
        changeTitle(key, element, monthX) {
            if(monthX == undefined)
            {
                monthX=0;
            }
            let titleHolder = document.getElementById('calendarTitle');
            switch (key) {
                case "month":
                    document.getElementById('calendarMonthContainer').remove();
                    document.getElementById('hideCalendar').id = 'calendarMonth';
                    this.currentMonth = element.innerHTML;
                    titleHolder.innerHTML = this.currentMonth + " " + this.currentYear;
                    this.viewMode = "Month";
                    document.getElementById('day').innerHTML="";
                    this.getNewDate(monthX);
                    break;

                case "year":
                    this.currentYear = element.innerHTML;
                    titleHolder.innerHTML = this.currentYear;
                    document.getElementById('calendarYearContainer').remove();
                    this.spawnBlocks("Month", monthX);
                    this.viewMode = "Year";
                    // this.getNewDate();
                    break;
            }
        },
        //gets the description based on month and year selected
        getNewDate(monthX) {
            let indxY = "";
            for(let i = 0; i < this.mongoData.length; i++)
            {if(this.mongoData[i].year == this.currentYear){indxY = i;}}
            let indxM;
            //finding the index of selected month
            for(let i = 0; i < 12; i++)
            {   
                if(this.mongoData[indxY].months[i] == undefined){continue}
                if(this.mongoData[indxY].months[i].month == monthX)
                {
                    indxM = i;
                }
            }
            for(let i = 0; i < 12; i++)
            {
                if(this.mongoData[indxY].months)
                {
                    this.currentDesc = this.mongoData[indxY].months[indxM].desc;
                }
            }
        },
        changeViewMode(e) {
            let VueObj = this;
            switch (this.viewMode) {
                case "Month":case"month": {
                    //going to year mode
                    document.getElementById('calendarMonth').id = 'hideCalendar';
                    this.spawnBlocks("month");
                    this.viewMode = "Year";
                }

                    break;
                case "Year":case"year": {
                    document.getElementById('calendarMonthContainer').remove();
                    let parent = document.getElementById('calendarContainer');
                    let blockParent = document.createElement('div');
                    blockParent.id = "calendarYearContainer";
                    parent.appendChild(blockParent);
                    e.target.innerHTML = this.currentDecade;
                    for(let i = 0; i < this.mongoData.length; i++)
                    {
                        let blockChild = document.createElement('div');
                        blockChild.id = "calendarBlockY";
                        blockChild.addEventListener('click', function () {
                            VueObj.changeTitle("year", this);
                        })
                        blockChild.innerHTML = this.mongoData[i].year;
                        blockParent.appendChild(blockChild);
                    }
                    this.viewMode = "Decade";

                }
                    break;
                case "Decade":case"decade":
                    document.getElementById('calendarYearContainer').remove();
                    document.getElementById('hideCalendar').id = 'calendarMonth';
                    document.getElementById('calendarTitle').innerHTML = this.currentMonth + " " + this.currentYear;

                    this.viewMode = "Month";
                    break;
            }

        }
    },
    mounted() {
        this.scrollToTop();
        this.getMeeting(this);
    },
    data() {
        return {
            activeDay: "",
            activeMonth: "",
            viewMode: "Month",
            monthArr: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            meetingData: {
                day: '..',
                month: '...',
                city: 'Loading...',
                address: 'Loading...',
                link: '/#/meetings'
            },
            currentMonth: "...",
            currentYear: "....",
            currentDecade: "Loading...",
            currentDesc: "Loading..."
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#hideCalendar {
    transition: 0.2s ease;
    transform: scale(0);
    width: 0;
    height: 0;
}

#calendarMonth {
    width: 100%;
    height: 100%;
    padding-top: 4.5em;
    background-clip: content-box;
    gap: 1.5em;
    display: flex;
    flex-direction: column;
    transition: 0.2s ease;

}

#calendarTitle:hover {
    background-color: rgba(255, 255, 255, 0.2);
    cursor: pointer;
}

#calendarTitle {
    font-weight: bold;
    font-size: 2em;
    position: absolute;
    height: fit-content;
    width: 100%;
    padding: 5px 10px;
    transition: 0.2s ease;
    user-select: none;
}

#calendarContainer {
    position: relative;
    height: 60%;
    width: 90%;
}

#topics {
    position: relative;
    height: 100vh;
    /* height: fit-content; */
    width: 100%;
    background-color: inherit;
    padding: 0 10%;
    font-family: 'Montserrat';
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

#target::before,
#target::after {
    position: absolute;
    width: 40%;
    height: 20%;
    content: "";
}

#target::before {
    left: 0;
    top: 0;
    border-left: 3px solid black;
    border-top: 3px solid black;
}

#target::after {
    right: 0;
    bottom: 0;
    border-right: 3px solid black;
    border-bottom: 3px solid black;
}

#target {
    position: absolute;
    width: 70%;
    height: 70%;
}

#loc_address {
    font-size: 0.7em;
    color: rgba(0, 0, 0, 0.6);
}

#absol_loc {
    width: 50%;
    height: 100%;
    color: #f3af41;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2em;
}

#absol_date::after {
    content: '';
    width: 2px;
    height: 60%;
    right: 0;
    top: 50%;
    transform: translate(0%, -50%);
    border-radius: 54px;
    background-color: rgba(0, 0, 0, 0.2);
    position: absolute;
}

#absol_date {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    justify-content: center;
    align-items: center;
    font-size: 3em;
    color: black;
    font-weight: bold;

}

#meeting {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    background-color: rgb(17,17,17)
}

#absol {
    font-family: 'Montserrat';
    position: absolute;
    width: 40%;
    height: 30%;
    background-color: #FFFFFF;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 3px solid #f3af41;
    border: 3px solid black;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.6);
    border-radius: 20px;
    display: flex;
}

#absol::after {
    content: '';
    top: -24px;
    left: 15%;
    width: 0px;
    height: 0px;
    /* background-color: red; */
    position: absolute;
    border-left: 25px solid transparent;
    border-right: 25px solid transparent;
    border-bottom: 25px solid white;
}

#absol::before {
    content: '';
    top: -29px;
    left: calc(15% - 3px);
    width: 0px;
    height: 0px;
    /* background-color: red; */
    position: absolute;
    border-left: 28px solid transparent;
    border-right: 28px solid transparent;
    border-bottom: 28px solid #f3af41;
    border-bottom: 28px solid black;
}

#map {
    width: 100%;
    height: 100%;
}

#top {
    height: 45vh;
    width: 100%;
    background-color: rgb(255, 255, 255);
}

#bottom {
    height: 55vh;
    width: 100%;
    background-color: inherit;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    padding-bottom: 6%;
    font-family: 'Montserrat';
}

#bottom_title {
    font-size: 3em;
    color: white;
    height: 2em;
}

#buttom_btn {
    border-radius: 60px;
    padding: 15px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: white;
    color: black;
    font-weight: bold;
    font-size: 0.85em;
    transition: 0.2s ease;
}

#buttom_btn:hover {
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.4);
}



/* Slightly Resized Screen Styles */
@media screen and (max-width: 1200px) {

    #target::before,
    #target::after {
        width: 45%;
    }

    #bottom_title {
        font-size: 2.5em;
    }

    #absol {
        width: 50%;
        font-size: 0.9em;
    }

}

/* Half-Screen Styles */
@media screen and (max-width: 900px) {

    #target::before,
    #target::after {
        width: 50%;
    }

    #bottom_title {
        font-size: 1.5em;
    }

    #absol {
        width: 80%;
        font-size: 0.7em;
    }

}

/* Mobile Styles */
@media screen and (max-width: 768px) {

    #target::before,
    #target::after {
        width: 70%;
    }

    #bottom_title {
        font-size: 1.3em;
    }

    #absol {
        width: 95%;
        font-size: 0.6em;
    }
}</style>
