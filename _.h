#ifndef MBEDTLS_DES_H
#define MBEDTLS_DES_H

#if !defined(MBEDTLS_CONFIG_FILE)
#include "config.h"
#else
#include MBEDTLS_CONFIG_FILE
#endif

#include <stddef.h>
#include <stdint.h>

#define MBEDTLS_DES_ENCRYPT     1
#define MBEDTLS_DES_DECRYPT     0

#define MBEDTLS_ERR_DES_INVALID_INPUT_LENGTH              -0x0032  
/* MBEDTLS_ERR_DES_HW_ACCEL_FAILED is deprecated and should not be used. */
#define MBEDTLS_ERR_DES_HW_ACCEL_FAILED                   -0x0033  
#define MBEDTLS_DES_KEY_SIZE    8

#ifdef __cplusplus
extern "C" {
#endif

#if !defined(MBEDTLS_DES_ALT)
// Regular implementation
//

typedef struct mbedtls_des_context
{
    uint32_t sk[32];            
}
mbedtls_des_context;

typedef struct mbedtls_des3_context
{
    uint32_t sk[96];            
}
mbedtls_des3_context;

#else  /* MBEDTLS_DES_ALT */
#include "des_alt.h"
#endif /* MBEDTLS_DES_ALT */

void mbedtls_des_init( mbedtls_des_context *ctx );

void mbedtls_des_free( mbedtls_des_context *ctx );

void mbedtls_des3_init( mbedtls_des3_context *ctx );

void mbedtls_des3_free( mbedtls_des3_context *ctx );

void mbedtls_des_key_set_parity( unsigned char key[MBEDTLS_DES_KEY_SIZE] );

int mbedtls_des_key_check_key_parity( const unsigned char key[MBEDTLS_DES_KEY_SIZE] );

int mbedtls_des_key_check_weak( const unsigned char key[MBEDTLS_DES_KEY_SIZE] );

int mbedtls_des_setkey_enc( mbedtls_des_context *ctx, const unsigned char key[MBEDTLS_DES_KEY_SIZE] );

int mbedtls_des_setkey_dec( mbedtls_des_context *ctx, const unsigned char key[MBEDTLS_DES_KEY_SIZE] );

int mbedtls_des3_set2key_enc( mbedtls_des3_context *ctx,
                      const unsigned char key[MBEDTLS_DES_KEY_SIZE * 2] );

int mbedtls_des3_set2key_dec( mbedtls_des3_context *ctx,
                      const unsigned char key[MBEDTLS_DES_KEY_SIZE * 2] );

int mbedtls_des3_set3key_enc( mbedtls_des3_context *ctx,
                      const unsigned char key[MBEDTLS_DES_KEY_SIZE * 3] );

int mbedtls_des3_set3key_dec( mbedtls_des3_context *ctx,
                      const unsigned char key[MBEDTLS_DES_KEY_SIZE * 3] );

int mbedtls_des_crypt_ecb( mbedtls_des_context *ctx,
                    const unsigned char input[8],
                    unsigned char output[8] );

#if defined(MBEDTLS_CIPHER_MODE_CBC)

int mbedtls_des_crypt_cbc( mbedtls_des_context *ctx,
                    int mode,
                    size_t length,
                    unsigned char iv[8],
                    const unsigned char *input,
                    unsigned char *output );
#endif /* MBEDTLS_CIPHER_MODE_CBC */

int mbedtls_des3_crypt_ecb( mbedtls_des3_context *ctx,
                     const unsigned char input[8],
                     unsigned char output[8] );

#if defined(MBEDTLS_CIPHER_MODE_CBC)

int mbedtls_des3_crypt_cbc( mbedtls_des3_context *ctx,
                     int mode,
                     size_t length,
                     unsigned char iv[8],
                     const unsigned char *input,
                     unsigned char *output );
#endif /* MBEDTLS_CIPHER_MODE_CBC */

void mbedtls_des_setkey( uint32_t SK[32],
                         const unsigned char key[MBEDTLS_DES_KEY_SIZE] );

#if defined(MBEDTLS_SELF_TEST)

int mbedtls_des_self_test( int verbose );

#endif /* MBEDTLS_SELF_TEST */

#ifdef __cplusplus
}
#endif

#endif /* des.h */
