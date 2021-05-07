import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as $ from 'jquery';

$(function() {
    var t = 0;
    $("body").on("show.bs.modal", ".modal.modal-fullscreen", function() {
        var a, o = $(this),
            n = o.find('.modal-footer  d-none .btn:not([data-dismiss="modal"])');
        o.find(".modal-header d-none .pull-right, .modal-header [data-additional-close]").remove(), $('').prependTo(o.find(".modal-header")), $.each(n, function() {
            var a, n = t++,
                d = $(this),
                l = d.data("glyphicon"),
                e = d.data("faicon"),
                i = d.data("mobileText") || d.text();
            $(this).attr("data-button-tag", n), l || e ? (a = $("").attr("title", i).attr("data-toggle", "tooltip").attr("data-placement", "bottom"), l && $('<i class="glyphicon ' + l + '">').appendTo(a), e && $('<i class="fa fa-2x ' + e + '">').appendTo(a)) : a = $("<button>").text(i), a.addClass("btn d-none btn-link").attr("data-button-tag", n).appendTo(o.find(".modal-header .fullscreen-buttons:last")), (l || e) && a.tooltip()
        }), $('<button class="btn d-none btn-link btn-lg" type="button" data-dismiss="modal" aria-label="Close" data-additional-close>').prependTo(o.find(".modal-header")), $('<i class="glyphicon glyphicon-chevron-left">').prependTo(o.find(".modal-header button:first")), history.pushState(null, null, null), a = function() {
            o.data("hidden-by-back", !0), o.modal("hide")
        }, $(window).one("popstate.fs-modal", a), o.one("hide.bs.modal", function() {
            $(window).off(".fs-modal", a), o.data("hidden-by-back") || history.back(), o.data("hidden-by-back", null)
        })
    }), $("body").on("click", ".modal-header .fullscreen-buttons .btn-link", function(t) {
        var a = $(this),
            o = a.data("buttonTag");
        a.parents(".modal-content").find(".modal-footer .d-none").find('[data-button-tag="' + o + '"]').click()
    })
});
