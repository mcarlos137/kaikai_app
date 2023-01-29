import { processColor } from "react-native"
import { months } from "../../../constants/time"

export const decorateFinancialOverviewData = (data, type, colors) => {
  if(data.length === 0 ){
    return {}
  }
  let earningsData = []
  let spendsData = []
  let datesData = []
  let usdEstimatedBalance = 0
  let partialData = {}
  let currentDate = new Date()
  let i = 0
  while (i < 9) {
    let monthPeriod = months[currentDate.getMonth()] + '-' + currentDate.getFullYear().toString().substring(2)
    partialData[monthPeriod] = [0, 0]
    currentDate.setMonth(currentDate.getMonth() - 1);
    i++
  }
  data.map((value, key) => {
    if (type !== 'ALL' && value.type !== type) return
    value.values.map((v, k) => {
      let date = new Date(Date.parse(v.timestamp))
      let monthPeriod = months[date.getMonth()] + '-' + date.getFullYear().toString().substring(2)
      usdEstimatedBalance = usdEstimatedBalance + v.earnings - v.spends
      partialData[monthPeriod][0] = partialData[monthPeriod][0] + v.earnings
      partialData[monthPeriod][1] = partialData[monthPeriod][1] + v.spends
    })
  })
  Object.keys(partialData).reverse().forEach((key) => {
    if (partialData[key][0] !== 0 || partialData[key][1] !== 0) {
      earningsData.push(partialData[key][0])
      spendsData.push(partialData[key][1])
      datesData.push(key)
    }
  });
  return {
    type: 'DIGITAL_BUSINESS',
    name: 'Digital Business',
    data: {
      dataSets: [{
        values: spendsData,
        label: 'Spends',
        config: {
          drawValues: true,
          colors: [processColor('red')],
          valueTextColor: processColor(colors.text),
        }
      }, {
        values: earningsData,
        label: 'Earnings USD ($)',
        config: {
          drawValues: true,
          colors: [processColor('green')],
          valueTextColor: processColor(colors.text),
        }
      }],
      config: {
        barWidth: 0.3,
        group: {
          fromX: -0.5,
          groupSpace: 0.2,
          barSpace: 0.1,
        },
      }
    },
    dataShow: 'CHART',
    xAxis: datesData,
    usdEstimatedBalance: usdEstimatedBalance,
    img: 'MY_DIGITAL_BUSINESS',
    noDataText: 'Create a new MoneyCall, Podcast, TV show, Fan Content or Live Streaming',
    target: 'DigitalBusinessScreen'
  }
}

export const decorateSubscriptionDetailsData = (data, type, colors) => {
  switch (type) {
    case 1:
      let activeSubscriptionUsersQuantity = 0
      let activeSubscriptionPremiumUsersQuantity = 0
      let activeSubscriptionTvShowsQuantity = 0
      let activeSubscriptionPodcastsQuantity = 0
      data.users.own.map((item, index) => {
        if (item.active) {
          activeSubscriptionUsersQuantity++
        }
      })
      data.premiumUsers.own.map((item, index) => {
        if (item.active) {
          activeSubscriptionPremiumUsersQuantity++
        }
      })
      data.tvShows.own.map((item, index) => {
        if (item.active) {
          activeSubscriptionTvShowsQuantity++
        }
      })
      data.liveStreamings.own.map((item, index) => {
        if (item.active) {
          activeSubscriptionPodcastsQuantity++
        }
      })
      return {
        data: {
          dataSets: [{
            values: [
              { value: activeSubscriptionUsersQuantity, label: 'Users' },
              { value: activeSubscriptionPremiumUsersQuantity, label: 'Fan Content' },
              { value: activeSubscriptionTvShowsQuantity, label: 'TV shows' },
              { value: activeSubscriptionPodcastsQuantity, label: 'Podcasts' },
            ],
            label: '',
            config: {
              colors: [
                processColor(colors.chart1),
                processColor(colors.chart2),
                processColor(colors.chart3),
                processColor(colors.chart4)
              ],
              valueTextSize: 13,
              sliceSpace: 5,
              selectionShift: 13,
              valueFormatter: "#.#'%'",
              valueLineColor: processColor('gray'),
              valueLinePart1Length: 0.5,
              valueTextColor: processColor(colors.text),
            }
          }],
        },
      }
    case 2:
      let activeSubscriptionPayedQuantity = 0
      let activeSubscriptionFreeQuantity = 0
      data.users.own.map((item, index) => {
        if (item.active) {
          if (Number(item.amount) > 0.00) {
            activeSubscriptionPayedQuantity++
          } else {
            activeSubscriptionFreeQuantity++
          }
        }
      })
      data.tvShows.own.map((item, index) => {
        if (item.active) {
          if (Number(item.amount) > 0.00) {
            activeSubscriptionPayedQuantity++
          } else {
            activeSubscriptionFreeQuantity++
          }
        }
      })
      data.liveStreamings.own.map((item, index) => {
        if (item.active) {
          if (Number(item.amount) > 0.00) {
            activeSubscriptionPayedQuantity++
          } else {
            activeSubscriptionFreeQuantity++
          }
        }
      })
      return {
        data: {
          dataSets: [{
            values: [
              { value: activeSubscriptionFreeQuantity, label: 'Free' },
              { value: activeSubscriptionPayedQuantity, label: 'Payed' },
            ],
            label: '',
            config: {
              colors: [
                processColor(colors.chart5),
                processColor(colors.chart6),
              ],
              valueTextSize: 13,
              sliceSpace: 5,
              selectionShift: 13,
              valueFormatter: "#.#'%'",
              valueLineColor: processColor('gray'),
              valueLinePart1Length: 0.5,
              valueTextColor: processColor(colors.text),
            }
          }],
        }
      }
    case 3:
      let tvShowsData = []
      let liveStreamingsData = []
      let usersData = []
      let premiumUsersData = []
      let payedData = []
      let freeData = []
      let datesData = []
      let partialData = {}
      let currentDate = new Date()
      let i = 0
      while (i < 9) {
        let monthPeriod = months[currentDate.getMonth()] + '-' + currentDate.getFullYear().toString().substring(2)
        partialData[monthPeriod] = [
          data.tvShows.general.previousActiveOwnPayedSubscriptions + data.tvShows.general.previousActiveOwnFreeSubscriptions,
          data.liveStreamings.general.previousActiveOwnPayedSubscriptions + data.liveStreamings.general.previousActiveOwnFreeSubscriptions,
          data.users.general.previousActiveOwnPayedSubscriptions + data.users.general.previousActiveOwnFreeSubscriptions,
          data.premiumUsers.general.previousActiveOwnPayedSubscriptions + data.premiumUsers.general.previousActiveOwnFreeSubscriptions,
          data.tvShows.general.previousActiveOwnPayedSubscriptions + data.liveStreamings.general.previousActiveOwnPayedSubscriptions + data.users.general.previousActiveOwnPayedSubscriptions,
          data.tvShows.general.previousActiveOwnFreeSubscriptions + data.liveStreamings.general.previousActiveOwnFreeSubscriptions + data.users.general.previousActiveOwnFreeSubscriptions,
        ]
        currentDate.setMonth(currentDate.getMonth() - 1);
        i++
      }
      data.tvShows.own.map((item, index) => {
        if (item.active) {
          let date = new Date(Date.parse(item.initialTimestamp))
          let monthPeriod = months[date.getMonth()] + '-' + date.getFullYear().toString().substring(2)
          if (partialData[monthPeriod] === undefined) return
          partialData[monthPeriod][0] = partialData[monthPeriod][0] + 1
          let loopActive = true
          Object.keys(partialData).forEach((key) => {
            if (key !== monthPeriod && loopActive) {
              partialData[key][0] = partialData[key][0] + 1
            } else {
              loopActive = false
            }
          });
          if (Number(item.amount) > 0.00) {
            partialData[monthPeriod][4] = partialData[monthPeriod][4] + 1
            let loopActive = true
            Object.keys(partialData).forEach((key) => {
              if (key !== monthPeriod && loopActive) {
                partialData[key][5] = partialData[key][5] + 1
              } else {
                loopActive = false
              }
            });
          } else {
            partialData[monthPeriod][5] = partialData[monthPeriod][5] + 1
            let loopActive = true
            Object.keys(partialData).forEach((key) => {
              if (key !== monthPeriod && loopActive) {
                partialData[key][5] = partialData[key][5] + 1
              } else {
                loopActive = false
              }
            });
          }
        }
      })
      data.liveStreamings.own.map((item, index) => {
        if (item.active) {
          let date = new Date(Date.parse(item.initialTimestamp))
          let monthPeriod = months[date.getMonth()] + '-' + date.getFullYear().toString().substring(2)
          if (partialData[monthPeriod] === undefined) return
          partialData[monthPeriod][1] = partialData[monthPeriod][1] + 1
          let loopActive = true
          Object.keys(partialData).forEach((key) => {
            if (key !== monthPeriod && loopActive) {
              partialData[key][1] = partialData[key][1] + 1
            } else {
              loopActive = false
            }
          });
          if (Number(item.amount) > 0.00) {
            partialData[monthPeriod][4] = partialData[monthPeriod][4] + 1
            let loopActive = true
            Object.keys(partialData).forEach((key) => {
              if (key !== monthPeriod && loopActive) {
                partialData[key][4] = partialData[key][4] + 1
              } else {
                loopActive = false
              }
            });
          } else {
            partialData[monthPeriod][5] = partialData[monthPeriod][5] + 1
            let loopActive = true
            Object.keys(partialData).forEach((key) => {
              if (key !== monthPeriod && loopActive) {
                partialData[key][5] = partialData[key][5] + 1
              } else {
                loopActive = false
              }
            });
          }
        }
      })
      data.users.own.map((item, index) => {
        if (item.active) {
          let date = new Date(Date.parse(item.initialTimestamp))
          let monthPeriod = months[date.getMonth()] + '-' + date.getFullYear().toString().substring(2)
          if (partialData[monthPeriod] === undefined) return
          partialData[monthPeriod][2] = partialData[monthPeriod][2] + 1
          let loopActive = true
          Object.keys(partialData).forEach((key) => {
            if (key !== monthPeriod && loopActive) {
              partialData[key][2] = partialData[key][2] + 1
            } else {
              loopActive = false
            }
          });
          if (Number(item.amount) > 0.00) {
            partialData[monthPeriod][4] = partialData[monthPeriod][4] + 1
            let loopActive = true
            Object.keys(partialData).forEach((key) => {
              if (key !== monthPeriod && loopActive) {
                partialData[key][4] = partialData[key][4] + 1
              } else {
                loopActive = false
              }
            });
          } else {
            partialData[monthPeriod][5] = partialData[monthPeriod][5] + 1
            let loopActive = true
            Object.keys(partialData).forEach((key) => {
              if (key !== monthPeriod && loopActive) {
                partialData[key][5] = partialData[key][5] + 1
              } else {
                loopActive = false
              }
            });
          }
        }
      })
      Object.keys(partialData).reverse().forEach((key) => {
        if (partialData[key][0] !== 0 || partialData[key][1] !== 0 || partialData[key][2] !== 0 || partialData[key][3] !== 0 || partialData[key][4] !== 0 || partialData[key][5] !== 0) {
          tvShowsData.push(partialData[key][0])
          liveStreamingsData.push(partialData[key][1])
          usersData.push(partialData[key][2])
          premiumUsersData.push(partialData[key][3])
          payedData.push(partialData[key][4])
          freeData.push(partialData[key][5])
          datesData.push(key)
        }
      });
      return {
        data: {
          dataSets: [{
            values: tvShowsData,
            label: 'TV shows',
            config: {
              color: processColor(colors.chart1),
              lineWidth: 3,
              drawCircles: false,
              valueTextColor: processColor(colors.text),
            }
          }, {
            values: liveStreamingsData,
            label: 'Podcasts',
            config: {
              color: processColor(colors.chart2),
              lineWidth: 3,
              drawCircles: false,
              valueTextColor: processColor(colors.text),
            }
          }, {
            values: usersData,
            label: 'Users',
            config: {
              color: processColor(colors.chart3),
              lineWidth: 3,
              drawCircles: false,
              valueTextColor: processColor(colors.text),
            }
          }, {
            values: premiumUsersData,
            label: 'Fan Content',
            config: {
              color: processColor(colors.chart4),
              lineWidth: 3,
              drawCircles: false,
              valueTextColor: processColor(colors.text),
            }
          }, {
            values: payedData,
            label: 'Payed',
            config: {
              color: processColor(colors.chart5),
              lineWidth: 3,
              drawCircles: false,
              valueTextColor: processColor(colors.text),
            }
          }, {
            values: freeData,
            label: 'Free',
            config: {
              color: processColor(colors.chart6),
              lineWidth: 3,
              drawCircles: false,
              valueTextColor: processColor(colors.text),
            }
          }]
        },
        xAxis: datesData
      }
  }
}

export const decorateMoneyCallDetailsData = (data, type, colors) => {
  switch (type) {
    case 1:
      return {
        data: {
          dataSets: [{
            values: [
              { value: 21, label: 'video/audio' },
              { value: 13, label: 'audio' },
            ],
            label: '',
            config: {
              colors: [
                processColor(colors.chart3),
                processColor(colors.chart5)
              ],
              valueTextSize: 13,
              sliceSpace: 5,
              selectionShift: 13,
              valueFormatter: "#.#'%'",
              valueLineColor: processColor('gray'),
              valueLinePart1Length: 0.5,
              valueTextColor: processColor(colors.text),
            }
          }],
        },
      }
    case 2:
      let stars = 4.2
      let reviews = 43
      return {
        stars: stars,
        reviews: reviews,
        topUsers: [
          {userName: '584245562952', name: 'josmararrieta', amount: 128.45},
          {userName: '584125193907', name: 'elvisandrades', amount: 78.25},
          {userName: '584125227055', name: 'valentinamolina', amount: 45.89},  
        ]
      }
    case 3:
      return {
        data: {
          dataSets: [{
            values: [18, 22, 15, 135, 71, 34],
            label: 'Created',
            config: {
              color: processColor(colors.chart4),
              lineWidth: 3,
              drawCircles: false,
              valueTextColor: processColor(colors.text),
            }
          }, {
            values: [90, 130, 100, 105, 90, 130],
            label: 'Received',
            config: {
              color: processColor(colors.chart6),
              lineWidth: 3,
              drawCircles: false,
              valueTextColor: processColor(colors.text),
            }
          }],
        },
        xAxis: ['Mar-22', 'Apr-22', 'May-22', 'Jun-22', 'Jul-22', 'Aug-22' ]
      }
  }
}

export const decorateDonationDetailsData = (data, type, colors) => {
  let values = []
  let datesData = []
  let countries = []
  let partialData = {}
  let currentDate = new Date()
  let i = 0
  while (i < 9) {
    let monthPeriod = months[currentDate.getMonth()] + '-' + currentDate.getFullYear().toString().substring(2)
    partialData[monthPeriod] = []
    let j = 0
    while (j < data.topCountries.length) {
      partialData[monthPeriod].push(0)
      j++
    }
    currentDate.setMonth(currentDate.getMonth() - 1);
    i++
  }
  let k = 0
  data.topCountries.map((item, index) => {
    countries.push(item.name)
    item.data.map((it, ind) => {
      let date = new Date(Date.parse(it.timestamp))
      let monthPeriod = months[date.getMonth()] + '-' + date.getFullYear().toString().substring(2)
      partialData[monthPeriod][k] = it.amount
    })
    k++
  })
  let addDate = false
  Object.keys(partialData).reverse().forEach((key) => {
    let value = []
    partialData[key].map((item, index) => {
      if (Number(item) > 0) {
        addDate = true
      }
      value.push(item)
    })
    if (addDate) {
      datesData.push(key)
      values.push({ y: value })
    }
  });
  return {
    data: {
      dataSets: [{
        values: values,
        label: '',
        config: {
          colors: [processColor(colors.chart1), processColor(colors.chart2), processColor(colors.chart3), processColor(colors.chart4)],
          stackLabels: countries,
          valueTextColor: processColor(colors.text),
        }
      }],
    },
    xAxis: datesData
  }
}