let includeRoom: any
let se = this.sarchWord;

includeRoom = {
        where: {
          shop_name: {
            like: '.*' + se + '.*',
            options: 'i'
          }
        },
        fields: {
          shop_name: true,
          city: true,
          createdAt: true,
          shop_status: true,
          id: true
        },
        limit: this.shopOptions.limit,
        skip: this.shopOptions.skip
      };
includeRoom = JSON.stringify(includeRoom);
includeRoom = encodeURIComponent(includeRoom);
return this.http.get<object>(apiUrl + 'Shops?filter=' + includeRoom, this.HttpOptions)

===============================================================================================================
