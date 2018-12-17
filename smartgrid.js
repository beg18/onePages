const smartgrid = require('smart-grid');

smartgrid('src/css/libs', {
    mobileFirst: false,
    filename: "smart-grid",
    columns: 12,
    offset: "30px",
    container: {
        maxWidth: "1170px"
    },
    breakPoints: {
        md: {
            width: "992px",
            fields: "15px"
        },
        sm: {
            width: "720px"
        },
        xs: {
            width: "576px"
        },
        xxs: {
            width: "380px"
        }
    }
});

smartgrid('src/css/libs', settings);




/*
smartgrid('.');
 * mobileFirst
 *  false -> max-width
 *  true -> min-width
 */