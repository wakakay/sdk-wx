(function () {
    var e = "2.8";
    var t = "plog";
    var n = "default";
    var i = require("./push-stat-conf.js");
    var o = {};
    var a = "";
    var s = false;
    var f = 0;
    var r = false;
    var p = ["define socket"];
    var u = false;
    var c = {};
    var l = null;
    var d = {
        uu: "",
        ak: "",
        pm: "",
        wvv: "",
        wsdk: "",
        sv: "",
        wv: "",
        nt: "",
        ww: "",
        wh: "",
        pr: "",
        pp: "",
        lat: "",
        lng: "",
        ev: "",
        st: "",
        et: "",
        ppx: "",
        ppy: "",
        v: "",
        data: "",
        fid: "",
        lang: "",
        wsr: "",
        ifo: "",
        jscode: "",
        etype: ""
    };
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (e) {
            if (this == null) {
                throw new TypeError
            }
            var t = Object(this);
            var n = t.length >>> 0;
            if (n === 0) {
                return -1
            }
            var i = 0;
            if (arguments.length > 1) {
                i = Number(arguments[1]);
                if (i != i) {
                    i = 0
                } else if (i != 0 && i != Infinity && i != -Infinity) {
                    i = (i > 0 || -1) * Math.floor(Math.abs(i))
                }
            }
            if (i >= n) {
                return -1
            }
            var o = i >= 0 ? i : Math.max(n - Math.abs(i), 0);
            for (; o < n; o++) {
                if (o in t && t[o] === e) {
                    return o
                }
            }
            return -1
        }
    }

    function h(e) {
        var t = wx.getStorageSync("t_uuid");
        if (!t) {
            t = "" + Date.now() + Math.floor(Math.random() * 1e7);
            wx.setStorageSync("t_uuid", t);
            wx.setStorageSync("ifo", 1);
            d.ifo = true
        } else {
            d.ifo = false
        }
        return t
    }

    var v = function (e) {
        wx.getLocation({
            type: "wgs84", success: function (t) {
                d["lat"] = t["latitude"];
                d["lng"] = t["longitude"];
                S(e, "location", "location")
            }
        })
    };
    var w = function (e) {
        wx.getSetting({
            success: function (t) {
                if (t.authSetting["scope.userLocation"]) {
                    v(e)
                }
                if (t.authSetting["scope.userInfo"]) {
                    g(e, function (t) {
                        e.aldpush_login_data = t;
                        S(e, "user_info", "userinfo")
                    })
                }
            }
        })
    };
    var g = function (e, t) {
        if (!i["is_getUserinfo"]) {
            return false
        }
        wx.login({
            success: function (e) {
                if (e.code) {
                    d.jscode = e.code;
                    wx.getUserInfo({
                        success: function (e) {
                            t(e)
                        }, fail: function (e) {
                            S(e, "user_info_close", "user_info_close")
                        }
                    })
                } else {
                    d.jscode = 0
                }
            }
        })
    };
    var y = function (e, n, i) {
        if (typeof arguments[1] === "undefined") n = "GET";
        if (typeof arguments[2] === "undefined") i = "d.html";
        if (JSON.stringify(e).length >= 8e3) {
            return
        }
        var o = 0;
        var a = function () {
            wx.request({
                url: "https://" + t + ".xiaoshentui.com/" + i,
                data: e,
                header: {},
                method: n,
                success: function () {
                },
                fail: function () {
                    if (o < 2) {
                        o++;
                        e["retryTimes"] = o;
                        a()
                    }
                }
            })
        };
        a()
    };
    var _ = function () {
        wx.request({
            url: "https://" + t + ".xiaoshentui.com/config/app.json",
            header: {AldStat: "MiniApp-Stat"},
            method: "GET",
            success: function (t) {
                if (t.statusCode === 200) {
                    if (t.data["push_v"] != e) {
                        console.warn("小神推sdk已更新,为不影响正常使用,请去官网(http://www.xiaoshentui.com/)下载最新版本")
                    }
                }
            }
        })
    };

    function S(t, n, f) {
        var r = h(t);
        var p = 0;
        if (n == "app" && f == "hide") {
            var u = Date.now();
            p = wx.getStorageSync("ifo");
            wx.setStorageSync("ifo", 0)
        }
        var c = "";
        if (n == "user_info") {
            c = t.aldpush_login_data
        } else if (n == "user_info_close") {
            c = {status: 0}
        } else if (n == "event") {
            c = o
        } else if (n == "yyy") {
            c = o
        } else {
            c = 0
        }
        var l = n == "fpage" || n == "fhpage" ? d.fid : 0;
        var v = n == "page" || n == "app" || n == "fpage" || n == "fhpage" ? 0 : d.jscode;
        var w = {
            v: e,
            uu: r,
            ev: n,
            life: f,
            ak: i["app_key"].replace(/(^\s*)|(\s*$)/g, ""),
            pm: d.pm ? d.pm : 0,
            wvv: d.wvv ? d.wvv : 0,
            wsdk: d.wsdk ? d.wsdk : 0,
            sv: d.sv ? d.sv : 0,
            wv: d.wv ? d.wv : 0,
            nt: d.nt ? d.nt : 0,
            ww: d.ww ? d.ww : 0,
            wh: d.wh ? d.wh : 0,
            pr: d.pr ? d.pr : 0,
            pp: d.pp ? d.pp : 0,
            lat: d.lat ? d.lat : 0,
            lng: d.lng ? d.lng : 0,
            st: d.st || 0,
            et: u ? u : 0,
            ppx: d.ppx ? d.ppx : 0,
            ppy: d.ppy ? d.ppy : 0,
            data: c ? c : 0,
            fid: l,
            lang: d.lang ? d.lang : 0,
            wsr: n == "app" ? t.aldpush_showOptions : {},
            ifo: p,
            jscode: v ? v : 0,
            ust: Date.now()
        };
        if (n === "setopenid") {
            if (t.aldpush_openid) {
                w["openid"] = t.aldpush_openid;
                w["user_info"] = t.aldpush_login_data
            }
        }
        if (a !== "" && (n === "event" || n === "yyy")) {
            w["etype"] = a
        }
        if (n === "yyy" && f === "postevent") {
            wx.request({
                url: "https://openapi.xiaoshentui.com/Main/action/Event/Event_upload/mobile_info",
                method: "POST",
                header: {"content-type": "application/json"},
                data: w,
                success: function (e) {
                }
            })
        } else if (n === "yyy" && s) {
            wx.request({
                url: "https://openapi.xiaoshentui.com/Main/action/Event/Event_upload/event_report",
                method: "POST",
                header: {"content-type": "application/json"},
                data: w,
                success: function (e) {
                }
            })
        } else {
            y(w, "GET", "d.html")
        }
    }

    function x(e) {
        this.app = e
    }

    x.prototype["pushuserinfo"] = function (e, t) {
        if (typeof e === "object") {
            var n = ["encryptedData", "errMsg", "iv", "rawData", "signature", "userInfo"];
            for (var i in e) {
                if (n.indexOf(i) < 0) {
                    return
                }
            }
            this.app.aldpush_login_data = e;
            if (typeof t === "string") {
                d.jscode = t
            }
            S(this.app, "user_info", "userinfo")
        }
    };
    x.prototype["setopenid"] = function (e, t) {
        if (typeof e === "string") {
            this.app.aldpush_openid = e;
            if (typeof t === "object") {
                var n = ["avatarUrl", "country", "city", "gender", "language", "nickName", "province", "unionld"];
                for (var i in t) {
                    if (n.indexOf(i) == -1) {
                        return
                    }
                }
                this.app.aldpush_login_data = t;
                S(this.app, "setopenid", "setopenid")
            }
        }
    };

    function m(e) {
        this["aldpush"] = new x(this);
        var t = this;
        if (typeof e != "undefined") {
            t.aldpush_showOptions = e;
            n = e["path"];
            d.pp = e["path"]
        } else {
            t.aldpush_showOptions = {}
        }
        var o = function () {
            wx.getNetworkType({
                success: function (e) {
                    d.nt = e["networkType"]
                }
            })
        };
        o();
        w(t);
        wx.getSystemInfo({
            success: function (e) {
                d.pm = e["model"];
                d.wv = e["version"];
                d.wsdk = typeof e["SDKVersion"] === "undefined" ? "1.0.0" : e["SDKVersion"];
                d.sv = e["system"];
                d.wvv = e["platform"];
                d.ww = e["screenWidth"];
                d.wh = e["screenHeight"];
                d.pr = e["pixelRatio"];
                d.lang = e["language"]
            }
        });
        wx.getSystemInfoSync({
            success: function (e) {
                d.wvv = e["platform"]
            }
        });
        if (d.wvv == "devtools") {
            _()
        }
        if (i.app_key) {
            wx.setStorageSync("t_appkey", i.app_key)
        }
    }

    function k(e) {
        var t = this;
        var n = "";
        var i = "wss://online.xiaoshentui.com/";
        wx.connectSocket({url: i + wx.getStorageSync("t_appkey") + "_" + wx.getStorageSync("t_uuid")});
        wx.onSocketError(function (e) {
            r = false
        });
        wx.onSocketOpen(function (e) {
            n = setInterval(function () {
                o("Ack with connection state thanks!")
            }, 5e4);
            r = true;
            for (var t = 0; t < p.length; t++) {
                o(p[t])
            }
            p = []
        });
        wx.onSocketMessage(function (e) {
            o("Ack with thanks!");
            var t = JSON.parse(e.data);
            if (t["app_key"] == wx.getStorageSync("t_appkey")) {
                t["isShow"] = true;
                u = true;
                c = t;
                a(l)
            }
        });
        wx.onSocketClose(function (e) {
            r = false;
            p = ["define socket"];
            if (n) {
                clearInterval(n)
            }
        });

        function o(e) {
            if (r) {
                wx.sendSocketMessage({data: e})
            } else {
                p.push(e)
            }
        }

        function a(e) {
            e.setData({onlineTier: u, onlineData: c});
            B(e, "atDetails", D);
            B(e, "colseOneBox", O)
        }
    }

    function D(e) {
        var t = this;
        var n = "/" + e.currentTarget.dataset.acdetail;
        var i = c;
        wx.navigateTo({
            url: n, success: function () {
                i["isShow"] = false;
                t.setData({onlineData: i})
            }, fail: function (e) {
                wx.switchTab({
                    url: n, success: function () {
                        i["isShow"] = false;
                        t.setData({onlineData: i})
                    }
                })
            }
        })
    }

    function O() {
        var e = c;
        e["isShow"] = false;
        this.setData({onlineData: e})
    }

    function M(e) {
        var t = this;
        t.isShow = true;
        if (i["is_sendEvent"]) {
            P(t)
        }
        if (typeof e != "undefined") {
            t.aldpush_showOptions = e
        } else {
            t.aldpush_showOptions = {}
        }
        if (i["is_encePush"]) {
            setTimeout(function () {
                k()
            }, 2e3)
        }
    }

    function T() {
        var e = this;
        e.isShow = false;
        S(e, "app", "hide");
        f = 0;
        if (i["is_encePush"]) {
            if (r) {
                wx.closeSocket()
            }
        }
    }

    function b(e) {
        var t = l = this;
        if (typeof e != "undefined") {
            t.options = e
        }
        d.st = Date.now();
        if (n != "default" && n != t["__route__"]) {
            g(t, function (e) {
                t.aldpush_login_data = e;
                S(t, "user_info", "userinfo")
            })
        }
        d.pp = this["__route__"]
    }

    function j(e) {
        var t = this;
        if (typeof e != "undefined") {
            t.options = e
        }
        d.pp = t["__route__"];
        n = t["__route__"];
        S(getApp(), "page", "hide");
        if (i["is_encePush"]) {
            if (typeof c["isShow"] !== "undefined") {
                u = false;
                c = {};
                this.setData({onlineTier: u, onlineData: c})
            }
        }
    }

    function A(e, t) {
        var n = d.ww;
        var i = d.wh;
        var o = this;
        var a = {length: [], is_showHideBtn: false};
        for (var s = 0; s <= 50; s++) {
            var f = Math.ceil(Math.random() * n);
            var r = Math.ceil(Math.random() * i);
            var p = '-webkit-transform: scale(0.5);transform:scale(1);content:"";height:88px;width:88px;border:1px solid transparent;background-color:transparent;position:fixed;z-index: 999;left:' + f + "px;top:" + r + "px;";
            a.length.push(p)
        }
        var u = wx.getStorageSync("isShowClick");
        o.setData({hideBtnData: a, isShowClick: Boolean(u)})
    }

    function I(e) {
        var t = this;
        d.ppx = e.detail.target.offsetLeft;
        d.ppy = e.detail.target.offsetTop;
        d.fid = e.detail.formId;

        function n() {
            wx.setStorageSync("isShowClick", "false");
            t.setData({is_showHideBtn: true, isShowClick: "false"})
        }

        g(t, function (e) {
            t.aldpush_login_data = e;
            S(t, "user_info", "userinfo");
            n()
        });
        if (i["is_Location"]) {
            v(t)
        }
        S(t, "fpage", "clickform")
    }

    function E(e) {
        var t = this;
        d.ppx = e.detail.target.offsetLeft;
        d.ppy = e.detail.target.offsetTop;
        d.fid = e.detail.formId;
        t.setData({is_showHideBtn: true});
        S(t, "fhpage", "hideclickform")
    }

    function L(e, t) {
        var n = "";
        var f = arguments;
        var r = this;
        if (!e) {
            e = f
        }
        if (e) {
            var p = ["onLoad", "onReady", "onShow", "onHide", "onUnload", "onPullDownRefresh", "onReachBottom", "onShareAppMessage", "onPageScroll"];
            if (typeof e["type"] === "undefined") {
                if (typeof e["from"] === "undefined") {
                    if (p.indexOf(t) >= 0) {
                        a = "wechat_function"
                    } else {
                        a = "developer_function"
                    }
                } else {
                    a = e.from
                }
            } else {
                a = e.type
            }
            n = typeof f[0] !== "undefined" ? f[0] : {};
            o = n;
            var u = i["filterFunc"];
            if (u.indexOf(t) >= 0) {
            } else {
                S(r, "event", t)
            }
            if (s) {
                S(r, "yyy", t)
            }
        }
    }

    function P(e) {
        wx.onAccelerometerChange(function (t) {
            if (!e.isShow) {
                return
            }
            if (t.x > 1 && t.y > 1) {
                f += 1;
                if (f >= 3) {
                    s = true;
                    S(e, "yyy", "postevent")
                }
            }
        })
    }

    function B(e, t, n) {
        if (e[t]) {
            var i = e[t];
            e[t] = function (e) {
                n.call(this, e, t);
                return i.call.apply(i, [this].concat(Array.prototype.slice.call(arguments)))
            }
        } else {
            e[t] = function (e) {
                n.call(this, e, t)
            }
        }
    }

    var C = App;
    App = function (e) {
        B(e, "onLaunch", m);
        B(e, "onShow", M);
        B(e, "onHide", T);
        C(e)
    };
    var H = Page;
    Page = function (e) {
        for (var t in e) {
            if (typeof e[t] === "function") {
                if (t == "onLoad") {
                    B(e, "onLoad", A);
                    continue
                }
                B(e, t, L)
            }
        }
        B(e, "onShow", b);
        B(e, "onHide", j);
        B(e, "hidepushFormSubmit", E);
        B(e, "pushFormSubmit", I);
        H(e)
    }
})();